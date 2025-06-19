
export class BackgroundMusicManager {
  private audio: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private isInitialized: boolean = false;
  private currentTrackIndex: number = 0;
  private availableTracks: string[] = [];
  private currentTrackName: string = '';

  constructor() {
    this.initializeAudio();
  }

  private async detectAvailableTracks(): Promise<string[]> {
    const tracks: string[] = [];
    
    // Check for bgm.mp3
    try {
      const response = await fetch('/sounds/bgm.mp3');
      if (response.ok) {
        tracks.push('bgm.mp3');
      }
    } catch (error) {
      console.log('bgm.mp3 not found');
    }

    // Check for numbered tracks (bgm1.mp3, bgm2.mp3, etc.)
    for (let i = 1; i <= 10; i++) {
      try {
        const response = await fetch(`/sounds/bgm${i}.mp3`);
        if (response.ok) {
          tracks.push(`bgm${i}.mp3`);
        }
      } catch (error) {
        // Track doesn't exist, continue checking
      }
    }

    return tracks;
  }

  private async initializeAudio() {
    if (this.isInitialized) return;
    
    try {
      // Detect available tracks first
      this.availableTracks = await this.detectAvailableTracks();
      
      if (this.availableTracks.length === 0) {
        console.warn('No background music tracks found');
        return;
      }

      this.audio = new Audio();
      this.loadCurrentTrack();
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';
      
      // Handle track ending - play next track
      this.audio.addEventListener('ended', () => {
        this.playNextTrack();
      });
      
      // Handle audio loading errors
      this.audio.addEventListener('error', (e) => {
        console.warn('Background music failed to load:', e);
        this.playNextTrack(); // Try next track on error
      });
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize background music:', error);
    }
  }

  private loadCurrentTrack() {
    if (!this.audio || this.availableTracks.length === 0) return;

    const trackName = this.availableTracks[this.currentTrackIndex];
    this.audio.src = `/sounds/${trackName}`;
    this.currentTrackName = trackName;
  }

  private playNextTrack() {
    if (this.availableTracks.length === 0) return;

    // Move to next track, loop back to first if at end
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.availableTracks.length;
    this.loadCurrentTrack();
    
    if (this.enabled) {
      this.play();
    }
  }

  async play() {
    if (!this.audio || !this.enabled) return;
    
    try {
      if (this.audio.paused) {
        await this.audio.play();
      }
    } catch (error) {
      console.warn('Failed to play background music:', error);
      // Try next track if current fails
      this.playNextTrack();
    }
  }

  pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.min(1, Math.max(0, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.play();
    } else {
      this.pause();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  getCurrentTrackName(): string {
    return this.currentTrackName;
  }

  getAvailableTracksCount(): number {
    return this.availableTracks.length;
  }
}

// Create singleton instance
export const backgroundMusicManager = new BackgroundMusicManager();
