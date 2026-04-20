"use client";

import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import {
  useYouTubePlayer,
  YouTubePlayerOptions,
} from "@/hooks/useYoutubeplayer";
import { cn } from "@/lib/utils";

export interface YouTubePlayerHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (seconds: number) => void;
  playFrom: (startSeconds: number, endSeconds?: number) => void;
  pauseAt: (atSeconds: number) => void;
  loadVideo: (
    videoId: string,
    startSeconds?: number,
    endSeconds?: number,
  ) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  isReady: () => boolean;
  isPlaying: () => boolean;
}

interface YouTubePlayerProps extends Omit<
  YouTubePlayerOptions,
  "onReady" | "onStateChange" | "onEnd"
> {
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  loadingText?: string;
  onReady?: (player: YT.Player) => void;
  onStateChange?: (state: number) => void;
  onEnd?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  timeUpdateIntervalMs?: number;
  children?: React.ReactNode;
}

const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export const YouTubePlayer = forwardRef<
  YouTubePlayerHandle,
  YouTubePlayerProps
>(function YouTubePlayer(
  {
    className,
    aspectRatio = "16/9",
    loadingText = "Cargando video...",
    onTimeUpdate,
    timeUpdateIntervalMs = 500,
    children,
    ...playerOptions
  },
  ref,
) {
  // ✅ Desestructuración completa: isReady/isPlaying son booleans primitivos,
  // no propiedades de un objeto que contiene refs.
  // Las funciones son useCallback estables → identidad fija entre renders.
  const {
    containerRef,
    isReady,
    isPlaying,
    play,
    pause,
    stop,
    seek,
    playFrom,
    pauseAt,
    loadVideo,
    setVolume,
    setPlaybackRate,
    getDuration,
    getCurrentTime,
  } = useYouTubePlayer(playerOptions);

  // ── onTimeUpdate ──────────────────────────────────────────────────────
  const onTimeUpdateRef = useRef(onTimeUpdate);
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    if (!isReady || !isPlaying) return;

    const id = setInterval(() => {
      onTimeUpdateRef.current?.(getCurrentTime());
    }, timeUpdateIntervalMs);

    return () => clearInterval(id);
  }, [isReady, isPlaying, getCurrentTime, timeUpdateIntervalMs]);

  // ── Handle imperativo ──────────────────────────────────────────────────
  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (isReady) play();
      },
      pause: () => {
        if (isReady) pause();
      },
      stop: () => {
        if (isReady) stop();
      },
      seek: (s) => {
        if (!isReady) return;
        seek(s);
        onTimeUpdateRef.current?.(s);
      },
      playFrom: (s, e) => {
        if (!isReady) return;
        playFrom(s, e);
        onTimeUpdateRef.current?.(s);
      },
      pauseAt: (s) => {
        if (isReady) pauseAt(s);
      },
      loadVideo: (id, s, e) => {
        if (isReady) loadVideo(id, s, e);
      },
      setVolume: (v) => {
        if (isReady) setVolume(v);
      },
      setPlaybackRate: (r) => {
        if (isReady) setPlaybackRate(r);
      },
      getDuration: () => (isReady ? getDuration() : 0),
      getCurrentTime: () => (isReady ? getCurrentTime() : 0),
      isReady: () => isReady,
      isPlaying: () => isPlaying,
    }),
    // ✅ isReady dispara la recreación del handle; las funciones son estables
    // y no necesitan estar en deps (misma referencia entre renders)
    [
      isReady,
      isPlaying,
      play,
      pause,
      stop,
      seek,
      playFrom,
      pauseAt,
      loadVideo,
      setVolume,
      setPlaybackRate,
      getDuration,
      getCurrentTime,
    ],
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black shadow-2xl",
        ASPECT_CLASSES[aspectRatio],
        className,
      )}
    >
      {/* Capa 1: Video */}
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {/* Capa 2: Overlay del padre — solo aparece cuando el player está listo.
            ✅ isReady es boolean primitivo, no acceso a ref durante render */}
      {isReady && children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      )}

      {/* Capa 3: Loading */}
      {!isReady && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span className="text-sm text-white/70 font-medium">
              {loadingText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
