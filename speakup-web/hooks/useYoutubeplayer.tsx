/// <reference types="youtube" />
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export interface YouTubePlayerOptions {
  videoId: string;
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  onReady?: (player: YT.Player) => void;
  onStateChange?: (state: YT.PlayerState) => void;
  onEnd?: () => void;
}

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
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
  const pauseAtRef = useRef<number | null>(null); // ← para pauseAt
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    videoId,
    autoplay = false,
    mute = false,
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

  // Limpia el intervalo de pauseAt cuando el video se detiene
  const clearPauseInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pauseAtRef.current = null;
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
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: mute ? 1 : 0,
          loop: loop ? 1 : 0,
          playlist: loop ? videoId : undefined,
          controls: controls ? 1 : 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            if (destroyed) return;
            setIsReady(true);
            onReadyRef.current?.(e.target);
          },
          onStateChange: (e) => {
            if (destroyed) return;
            const playing = e.data === YT.PlayerState.PLAYING;
            setIsPlaying(playing);
            onStateRef.current?.(e.data);
            if (e.data === YT.PlayerState.ENDED) {
              clearPauseInterval();
              onEndRef.current?.();
            }
            // Si se detiene/pausa manualmente, cancela el pauseAt pendiente
            if (!playing) clearPauseInterval();
          },
        },
      });
    });

    return () => {
      destroyed = true;
      clearPauseInterval();
      playerRef.current?.destroy();
      playerRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
    };
  }, [videoId, autoplay, mute, loop, controls, clearPauseInterval]);

  // ── Métodos de control ──────────────────────────────────────────────────

  /** Reproduce desde `startSeconds` y pausa opcionalmente en `endSeconds` */
  const playFrom = useCallback(
    (startSeconds: number, endSeconds?: number) => {
      const p = playerRef.current;
      if (!p) return;
      clearPauseInterval();
      p.seekTo(startSeconds, true);
      p.playVideo();

      if (endSeconds !== undefined && endSeconds > startSeconds) {
        pauseAtRef.current = endSeconds;
        intervalRef.current = setInterval(() => {
          const current = p.getCurrentTime?.() ?? 0;
          if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
            p.pauseVideo();
            clearPauseInterval();
          }
        }, 200); // polling cada 200 ms
      }
    },
    [clearPauseInterval],
  );

  /** Pausa el video exactamente en `atSeconds` (si ya está reproduciéndose) */
  const pauseAt = useCallback(
    (atSeconds: number) => {
      const p = playerRef.current;
      if (!p) return;
      clearPauseInterval();
      pauseAtRef.current = atSeconds;
      intervalRef.current = setInterval(() => {
        const current = p.getCurrentTime?.() ?? 0;
        if (pauseAtRef.current !== null && current >= pauseAtRef.current) {
          p.pauseVideo();
          clearPauseInterval();
        }
      }, 200);
    },
    [clearPauseInterval],
  );

  /** Carga un video diferente sin desmontar el player */
  const loadVideo = useCallback((newVideoId: string, startSeconds = 0) => {
    playerRef.current?.loadVideoById({ videoId: newVideoId, startSeconds });
  }, []);

  return {
    containerRef,
    playerRef, // acceso directo para casos no cubiertos
    isReady,
    isPlaying,
    // Controles básicos
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    stop: () => playerRef.current?.stopVideo(),
    seek: (s: number) => playerRef.current?.seekTo(s, true),
    setVolume: (v: number) => playerRef.current?.setVolume(v),
    mute: () => playerRef.current?.mute(),
    unMute: () => playerRef.current?.unMute(),
    setPlaybackRate: (r: number) => playerRef.current?.setPlaybackRate(r),
    // Getters de estado
    getDuration: () => playerRef.current?.getDuration() ?? 0,
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    // Control de segmento ← nuevos
    playFrom,
    pauseAt,
    loadVideo,
  };
}
