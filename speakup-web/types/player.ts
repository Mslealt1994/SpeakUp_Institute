
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

export interface YouTubePlayerHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (seconds: number) => void;
  playFrom: (startSeconds: number, endSeconds?: number) => void;
  pauseAt: (atSeconds: number) => void;
  loadVideo: (videoId: string, startSeconds?: number, endSeconds?: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  isReady: () => boolean;
  isPlaying: () => boolean;
}