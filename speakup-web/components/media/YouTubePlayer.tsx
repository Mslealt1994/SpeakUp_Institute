/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import { useYouTubePlayer } from "@/hooks/useYoutubeplayer";
import { YouTubePlayerOptions, YouTubePlayerHandle } from "@/types/player";
import { cn } from "@/lib/utils";

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

  useImperativeHandle(
    ref,
    () => ({
      play: () => isReady && play(),
      pause: () => isReady && pause(),
      stop: () => isReady && stop(),
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
      pauseAt: (s) => isReady && pauseAt(s),
      loadVideo: (id, s, e) => isReady && loadVideo(id, s, e),
      setVolume: (v) => isReady && setVolume(v),
      setPlaybackRate: (r) => isReady && setPlaybackRate(r),
      getDuration: () => (isReady ? getDuration() : 0),
      getCurrentTime: () => (isReady ? getCurrentTime() : 0),
      isReady: () => isReady,
      isPlaying: () => isPlaying,
    }),
    [isReady, isPlaying],
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black shadow-2xl",
        ASPECT_CLASSES[aspectRatio],
        className,
      )}
    >
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {isReady && children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      )}

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
