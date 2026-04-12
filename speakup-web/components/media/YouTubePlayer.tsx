"use client";

import { forwardRef, useImperativeHandle } from "react";
import {
  useYouTubePlayer,
  YouTubePlayerOptions,
} from "@/hooks/useYoutubeplayer";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps extends YouTubePlayerOptions {
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  loadingText?: string;
}

const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "1/1": "aspect-square",
};

// Solo métodos en el handle — el estado (isReady, isPlaying)
// se pasa como props/callbacks, no como ref
export interface YouTubePlayerHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (seconds: number) => void;
  playFrom: (start: number, end?: number) => void;
  pauseAt: (seconds: number) => void;
  loadVideo: (videoId: string, startSeconds?: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
}

export const YouTubePlayer = forwardRef<
  YouTubePlayerHandle,
  YouTubePlayerProps
>(function YouTubePlayer(
  {
    className,
    aspectRatio = "16/9",
    loadingText = "Cargando video...",
    ...playerOptions
  },
  ref,
) {
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

  // Solo métodos imperativos — sin estado reactivo
  useImperativeHandle(
    ref,
    () => ({
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
    }),
    // Las funciones del hook son estables (useCallback), no necesitan re-crearse
    [
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
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {!isReady && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80"
          role="status"
          aria-label={loadingText}
        >
          <div className="flex flex-col items-center gap-3 text-white/70">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"
              aria-hidden="true"
            />
            <span className="text-sm" aria-hidden="true">
              {loadingText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
