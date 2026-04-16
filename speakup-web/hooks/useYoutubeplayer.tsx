/// <reference types="youtube" />
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface YouTubePlayerOptions {
  videoId: string;
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  startSeconds?: number;
  endSeconds?: number;
  onReady?: (player: YT.Player) => void;
  onStateChange?: (state: number) => void;
  onEnd?: () => void;
}

const pending: Array<(yt: typeof YT) => void> = [];

function waitForYT(): Promise<typeof YT> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    pending.push(resolve);
    if (pending.length === 1) {
      window.onYouTubeIframeAPIReady = () => {
        pending.forEach((r) => r(window.YT));
        pending.length = 0;
      };
    }
  });
}

export function useYouTubePlayer(options: YouTubePlayerOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pauseAtRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoIdRef = useRef(options.videoId);
  const startSecondsRef = useRef(options.startSeconds);
  const endSecondsRef = useRef(options.endSeconds);
  const isReadyRef = useRef(false);

  const {
    autoplay = false,
    mute: muteOption = false,
    loop = false,
    controls = true,
  } = options;

  const onReadyRef = useRef(options.onReady);
  const onEndRef = useRef(options.onEnd);
  const onStateRef = useRef(options.onStateChange);

  useEffect(() => {
    onReadyRef.current = options.onReady;
    onEndRef.current = options.onEnd;
    onStateRef.current = options.onStateChange;
  }, [options.onReady, options.onEnd, options.onStateChange]);

  // ✅ clearPauseInterval ahora acepta un flag para disparar onEnd
  // cuando el video se pausa por endSeconds (no llega a ENDED naturalmente)
  const clearPauseInterval = useCallback((triggerOnEnd = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pauseAtRef.current = null;
    if (triggerOnEnd) {
      onEndRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    if (!window.document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    waitForYT().then((YT) => {
      if (destroyed || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: videoIdRef.current,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: muteOption ? 1 : 0,
          loop: loop ? 1 : 0,
          playlist: loop ? videoIdRef.current : undefined,
          controls: controls ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          start: startSecondsRef.current,
          end: endSecondsRef.current,
        },
        events: {
          onReady: (e) => {
            if (destroyed) return;
            isReadyRef.current = true;
            setIsReady(true);
            onReadyRef.current?.(e.target);
          },
          onStateChange: (e) => {
            if (destroyed) return;
            const playing = e.data === YT.PlayerState.PLAYING;
            setIsPlaying(playing);
            onStateRef.current?.(e.data);
            if (e.data === YT.PlayerState.ENDED) {
              // Video terminó naturalmente — disparamos onEnd sin triggerOnEnd
              // porque clearPauseInterval ya no tiene intervalo activo
              clearPauseInterval(false);
              onEndRef.current?.();
            }
            if (!playing) clearPauseInterval(false);
          },
        },
      });
    });

    return () => {
      destroyed = true;
      isReadyRef.current = false;
      clearPauseInterval(false);
      playerRef.current?.destroy();
      playerRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
    };
  }, [autoplay, muteOption, loop, controls, clearPauseInterval]);

  const isFirstVideoRender = useRef(true);
  useEffect(() => {
    videoIdRef.current = options.videoId;
    startSecondsRef.current = options.startSeconds;
    endSecondsRef.current = options.endSeconds;

    if (isFirstVideoRender.current) {
      isFirstVideoRender.current = false;
      return;
    }

    if (!isReadyRef.current || !playerRef.current) return;

    clearPauseInterval(false);

    playerRef.current.loadVideoById({
      videoId: options.videoId,
      startSeconds: options.startSeconds ?? 0,
      endSeconds: options.endSeconds,
    });

    if (
      options.endSeconds !== undefined &&
      options.endSeconds > (options.startSeconds ?? 0)
    ) {
      const p = playerRef.current;
      pauseAtRef.current = options.endSeconds;
      intervalRef.current = setInterval(() => {
        const current = p.getCurrentTime?.() ?? 0;
        if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
          p.pauseVideo();
          // ✅ triggerOnEnd: true — el video llegó al fin definido por endSeconds
          clearPauseInterval(true);
        }
      }, 200);
    }
  }, [options.videoId, options.startSeconds, options.endSeconds, clearPauseInterval]);

  const playFrom = useCallback(
    (startSeconds: number, endSeconds?: number) => {
      const p = playerRef.current;
      if (!p) return;
      clearPauseInterval(false);

      const currentVideoId = p.getVideoData?.()?.video_id;
      if (currentVideoId === videoIdRef.current) {
        p.seekTo(startSeconds, true);
        p.playVideo();
      } else {
        p.loadVideoById({ videoId: videoIdRef.current, startSeconds, endSeconds });
      }

      if (endSeconds !== undefined && endSeconds > startSeconds) {
        pauseAtRef.current = endSeconds;
        intervalRef.current = setInterval(() => {
          const current = p.getCurrentTime?.() ?? 0;
          if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
            p.pauseVideo();
            // ✅ triggerOnEnd: true
            clearPauseInterval(true);
          }
        }, 200);
      }
    },
    [clearPauseInterval],
  );

  const pauseAt = useCallback(
    (atSeconds: number) => {
      const p = playerRef.current;
      if (!p) return;
      clearPauseInterval(false);
      pauseAtRef.current = atSeconds;
      intervalRef.current = setInterval(() => {
        const current = p.getCurrentTime?.() ?? 0;
        if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
          p.pauseVideo();
          // pauseAt es una pausa de control, no fin de lección — no dispara onEnd
          clearPauseInterval(false);
        }
      }, 200);
    },
    [clearPauseInterval],
  );

  const loadVideo = useCallback(
    (newVideoId: string, startSeconds = 0, endSeconds?: number) => {
      const p = playerRef.current;
      if (!p) return;
      clearPauseInterval(false);
      p.loadVideoById({ videoId: newVideoId, startSeconds, endSeconds });

      if (endSeconds !== undefined && endSeconds > startSeconds) {
        pauseAtRef.current = endSeconds;
        intervalRef.current = setInterval(() => {
          const current = p.getCurrentTime?.() ?? 0;
          if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
            p.pauseVideo();
            // ✅ triggerOnEnd: true
            clearPauseInterval(true);
          }
        }, 200);
      }
    },
    [clearPauseInterval],
  );

  const getDuration = useCallback(
    () => playerRef.current?.getDuration() ?? 0,
    [],
  );

  const getCurrentTime = useCallback(
    () => playerRef.current?.getCurrentTime() ?? 0,
    [],
  );

  return {
    containerRef,
    playerRef,
    isReady,
    isPlaying,
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    stop: () => playerRef.current?.stopVideo(),
    seek: (s: number) => playerRef.current?.seekTo(s, true),
    setVolume: (v: number) => playerRef.current?.setVolume(v),
    mute: () => playerRef.current?.mute(),
    unMute: () => playerRef.current?.unMute(),
    setPlaybackRate: (r: number) => playerRef.current?.setPlaybackRate(r),
    getDuration,
    getCurrentTime,
    playFrom,
    pauseAt,
    loadVideo,
  };
}