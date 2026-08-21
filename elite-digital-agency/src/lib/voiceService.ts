import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../data/skillTranslations';

export interface VoicePlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentWordIndex: number;
  currentProgress: number; // 0 to 1
  audioData: number[]; // For waveform visualizer
  currentSkillId: string | null;
  currentLanguage: SupportedLanguage;
  speechRate: number;
  activeVoiceName: string;
}

type Listener = (state: VoicePlaybackState) => void;

class VoiceServiceManager {
  private utterance: SpeechSynthesisUtterance | null = null;
  private currentText: string = '';
  private currentSkillId: string | null = null;
  private currentLanguage: SupportedLanguage = 'te'; // Default to Telugu as requested
  private speechRate: number = 0.95;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private currentWordIndex: number = 0;
  private words: string[] = [];
  private listeners: Set<Listener> = new Set();
  private animFrameId: number | null = null;
  private timerInterval: any = null;
  private allVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  public initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      this.allVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      console.warn('Could not retrieve speech synthesis voices:', e);
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.allVoices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
    }
    return this.allVoices;
  }

  public setLanguage(lang: SupportedLanguage): void {
    this.currentLanguage = lang;
    this.notify();
  }

  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public setSpeechRate(rate: number): void {
    this.speechRate = Math.max(0.7, Math.min(1.5, rate));
    this.notify();
  }

  public getSpeechRate(): number {
    return this.speechRate;
  }

  private findBestVoice(langCode: SupportedLanguage): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (!voices || voices.length === 0) return null;

    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    const targetTag = langObj ? langObj.speechLang.toLowerCase() : 'en-in';
    const primaryCode = langCode.toLowerCase();

    // 1. Exact match e.g. "te-IN"
    let match = voices.find(v => v.lang.toLowerCase() === targetTag || v.lang.toLowerCase().replace('_', '-') === targetTag);
    if (match) return match;

    // 2. Starts with primary code e.g. "te"
    match = voices.find(v => v.lang.toLowerCase().startsWith(primaryCode));
    if (match) return match;

    // 3. Name includes language name (e.g. "Telugu", "Hindi", "Tamil")
    const langName = langObj ? langObj.name.toLowerCase() : '';
    if (langName) {
      match = voices.find(v => v.name.toLowerCase().includes(langName));
      if (match) return match;
    }

    // 4. For English, look for Indian English or natural female
    if (langCode === 'en') {
      match = voices.find(v => 
        (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('en_in')) ||
        (v.lang.toLowerCase().startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('natural')))
      );
      if (match) return match;
      match = voices.find(v => v.lang.toLowerCase().startsWith('en'));
      if (match) return match;
    }

    // 5. Fallback
    return voices[0] || null;
  }

  public getActiveVoiceName(): string {
    const voice = this.findBestVoice(this.currentLanguage);
    if (voice) {
      return `${voice.name} (${voice.lang})`;
    }
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === this.currentLanguage);
    return `${langObj ? langObj.name : 'AI'} Voice Engine`;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const state: VoicePlaybackState = {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentWordIndex: this.currentWordIndex,
      currentProgress: this.words.length > 0 ? Math.min(1, this.currentWordIndex / this.words.length) : 0,
      audioData: this.generateWaveformData(),
      currentSkillId: this.currentSkillId,
      currentLanguage: this.currentLanguage,
      speechRate: this.speechRate,
      activeVoiceName: this.getActiveVoiceName(),
    };
    this.listeners.forEach(l => l(state));
  }

  private generateWaveformData(): number[] {
    if (!this.isPlaying || this.isPaused) {
      return [4, 6, 8, 5, 4, 8, 6, 4, 7, 5, 4, 6, 8, 5, 4, 8];
    }
    const count = 16;
    const time = Date.now() / 110;
    const data: number[] = [];
    for (let i = 0; i < count; i++) {
      const val = 8 + Math.sin(time + i * 0.7) * 13 + Math.cos(time * 1.4 + i * 0.5) * 9 + (Math.random() * 5);
      data.push(Math.max(4, Math.min(34, Math.round(val))));
    }
    return data;
  }

  public playSkillVoice(skillId: string, text: string, lang?: SupportedLanguage): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this browser');
      return;
    }

    if (lang) {
      this.currentLanguage = lang;
    }

    // If same skill and same text is paused, resume
    if (this.currentSkillId === skillId && this.isPaused && this.currentText === text) {
      this.resume();
      return;
    }

    // Stop previous utterance
    this.stopInternal();

    this.currentSkillId = skillId;
    this.currentText = text;
    this.words = text.split(/\s+/).filter(w => w.length > 0);
    this.currentWordIndex = 0;
    this.isPlaying = true;
    this.isPaused = false;

    // Wake up speech synthesis in case it's in paused/idle state in Chrome
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    } catch (e) {
      // Ignore
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.utterance = utterance;

    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === this.currentLanguage);
    utterance.lang = langObj ? langObj.speechLang : 'te-IN';

    const selectedVoice = this.findBestVoice(this.currentLanguage);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = this.speechRate;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    // Word boundary tracking for karaoke highlighting
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        let accumulated = 0;
        for (let i = 0; i < this.words.length; i++) {
          accumulated += this.words[i].length + 1;
          if (accumulated >= charIndex) {
            this.currentWordIndex = i;
            break;
          }
        }
        this.notify();
      }
    };

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.startWaveformLoop();
      this.notify();
    };

    utterance.onpause = () => {
      this.isPaused = true;
      this.notify();
    };

    utterance.onresume = () => {
      this.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentWordIndex = this.words.length;
      this.stopWaveformLoop();
      this.notify();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event error:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.stopWaveformLoop();
      this.notify();
    };

    // Smooth fallback progress timer in case onboundary is not emitted by engine
    const wordsCount = Math.max(1, this.words.length);
    // Estimated words per minute based on speech rate
    const estimatedWpm = 130 * this.speechRate;
    const estimatedDurationMs = (wordsCount / (estimatedWpm / 60)) * 1000;
    const intervalMs = 120;
    const step = wordsCount / (estimatedDurationMs / intervalMs);
    let estimatedIdx = 0;

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        estimatedIdx += step;
        if (estimatedIdx > this.currentWordIndex && estimatedIdx < wordsCount) {
          this.currentWordIndex = Math.floor(estimatedIdx);
          this.notify();
        }
      }
    }, intervalMs);

    // Speak immediately within the user gesture context for full mobile and browser compatibility
    try {
      window.speechSynthesis.speak(utterance);
      this.startWaveformLoop();
    } catch (err) {
      console.error('SpeechSynthesis.speak failed:', err);
    }
  }

  public pause(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.isPlaying && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.isPlaying && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  private stopInternal(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore
      }
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentWordIndex = 0;
    this.stopWaveformLoop();
  }

  public stop(): void {
    this.stopInternal();
    this.currentSkillId = null;
    this.notify();
  }

  public speakGreeting(
    text: string,
    langCode: SupportedLanguage,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      this.stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const voice = this.findBestVoice(langCode);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode)?.speechLang || 'te-IN';

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('speakGreeting error:', e);
      if (onEnd) onEnd();
    }
  }

  public replay(): void {
    if (this.currentSkillId && this.currentText) {
      const id = this.currentSkillId;
      const text = this.currentText;
      const lang = this.currentLanguage;
      this.stop();
      setTimeout(() => {
        this.playSkillVoice(id, text, lang);
      }, 100);
    }
  }

  private startWaveformLoop(): void {
    if (this.animFrameId) return;
    const loop = () => {
      if (this.isPlaying) {
        this.notify();
        this.animFrameId = requestAnimationFrame(loop);
      } else {
        this.animFrameId = null;
      }
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  private stopWaveformLoop(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}

export const VoiceService = new VoiceServiceManager();
