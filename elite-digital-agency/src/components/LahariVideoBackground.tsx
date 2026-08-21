import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Upload,
} from 'lucide-react';
import { EliteLogo } from './EliteLogo';
import { StorageService } from '../lib/storage';
import { AgencySettings } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface LahariVideoBackgroundProps {
  settings: AgencySettings;
  onUpdateSettings?: (settings: AgencySettings) => void;
  currentLanguage?: SupportedLanguage;
}

export const LahariVideoBackground: React.FC<LahariVideoBackgroundProps> = ({
  settings,
  onUpdateSettings,
  currentLanguage = 'te',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  const [videoSource, setVideoSource] = useState<string>(
    settings.hero_video_url || ''
  );

  useEffect(() => {
    if (settings.hero_video_url) {
      setVideoSource(settings.hero_video_url);
    }
  }, [settings.hero_video_url]);

  // Attempt auto-play on video source change (strictly muted)
  useEffect(() => {
    if (videoRef.current && videoSource) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [videoSource]);

  // Canvas Studio Animator (Simulates the video presenter studio with live visual backdrop)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 1280);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 800);

      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric cyber glow overlay
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        20,
        width / 2,
        height * 0.5,
        width * 0.7
      );
      bgGrad.addColorStop(0, 'rgba(34, 211, 238, 0.08)');
      bgGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle luminous cyber particles
      for (let i = 0; i < 12; i++) {
        const bx = (Math.sin(time * 0.2 + i * 1.5) * 0.5 + 0.5) * width;
        const by = (Math.cos(time * 0.15 + i * 2.1) * 0.5 + 0.5) * height * 0.8;
        const bRad = 2 + Math.sin(time + i) * 1.5;
        ctx.beginPath();
        ctx.arc(bx, by, bRad, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(34, 211, 238, 0.25)' : 'rgba(245, 158, 11, 0.25)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setVideoSource(objectUrl);
    setVideoError(false);
    setVideoLoaded(false);

    const updated = {
      ...settings,
      hero_video_url: objectUrl,
    };
    StorageService.updateSettings(updated);
    if (onUpdateSettings) {
      onUpdateSettings(updated);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#06080e]">
      {/* 1. Animated Studio Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* 2. Direct Video Stream (Always Muted) */}
      {videoSource && (
        <video
          ref={videoRef}
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            setVideoLoaded(true);
            setVideoError(false);
          }}
          onError={() => {
            setVideoError(true);
            setVideoLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            videoLoaded && !videoError
              ? 'opacity-40 sm:opacity-55 scale-100 filter brightness-95'
              : 'opacity-0 scale-95'
          }`}
        />
      )}

      {/* 3. Ambient Dynamic Lighting Overlay */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        {/* Warm Studio Keylight Glow */}
        <div className="absolute top-[20%] w-[550px] h-[550px] bg-gradient-to-tr from-amber-600/20 via-cyan-500/10 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* 4. Cinematic Dark Vignette & Frosted Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/40 to-[#030712] pointer-events-none" />

      {/* 5. Floating Controls Bar (Top Right) */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-2">
        {/* Video Play / Pause Toggle */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-black/60 hover:bg-white/[0.1] border border-white/15 text-slate-300 hover:text-white backdrop-blur-xl transition-colors cursor-pointer shadow-md"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 fill-current text-cyan-400" />
          )}
        </button>

        {/* Upload / Replace Video File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full bg-black/60 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 backdrop-blur-xl transition-colors cursor-pointer shadow-md"
          title="Upload or Change Background Video File"
        >
          <Upload className="w-4 h-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/mov,video/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
