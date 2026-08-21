import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Square,
  Volume2,
  Sparkles,
  Bot,
  Cpu,
  MessageSquareCode,
  Film,
  Globe,
  Search,
  LayoutGrid,
  Image,
  Share2,
  TrendingUp,
  Heart,
  MapPin,
  PhoneCall,
  ExternalLink,
  Instagram,
  Languages,
  Gauge,
} from 'lucide-react';
import { Skill } from '../types';
import { VoiceService, VoicePlaybackState } from '../lib/voiceService';
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  SKILL_TRANSLATIONS,
  SkillTranslation,
} from '../data/skillTranslations';

interface SkillModalProps {
  skill: Skill | null;
  initialLanguage?: SupportedLanguage | string;
  onClose: () => void;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  MessageSquareCode,
  Film,
  Globe,
  Search,
  Sparkles,
  LayoutGrid,
  Image,
  Share2,
  TrendingUp,
  Heart,
  MapPin,
  PhoneCall,
};

export const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  initialLanguage = 'te',
  onClose,
  onLanguageChange,
}) => {
  const defaultLang = (initialLanguage as SupportedLanguage) || 'te';
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(defaultLang);
  const [voiceState, setVoiceState] = useState<VoicePlaybackState>({
    isPlaying: false,
    isPaused: false,
    currentWordIndex: 0,
    currentProgress: 0,
    audioData: [4, 6, 8, 5, 4, 8, 6, 4, 7, 5, 4, 6, 8, 5, 4, 8],
    currentSkillId: null,
    currentLanguage: defaultLang,
    speechRate: 0.95,
    activeVoiceName: 'Telugu AI Voice Engine',
  });

  // Retrieve translation for active language helper
  const getActiveTranslation = (skillId: string, lang: SupportedLanguage): SkillTranslation => {
    if (SKILL_TRANSLATIONS[skillId] && SKILL_TRANSLATIONS[skillId][lang]) {
      return SKILL_TRANSLATIONS[skillId][lang];
    }
    // Fallback translation
    return {
      title: skill?.title || '',
      short_description: skill?.short_description || '',
      what_is_it: skill?.what_is_it || '',
      why_useful: skill?.why_useful || '',
      what_i_do: skill?.what_i_do || '',
      voice_script: skill?.voice_script || '',
    };
  };

  // Subscribe to VoiceService updates
  useEffect(() => {
    const unsubscribe = VoiceService.subscribe((state) => {
      setVoiceState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Sync initial language if passed
  useEffect(() => {
    if (initialLanguage && initialLanguage !== selectedLang) {
      setSelectedLang(initialLanguage);
    }
  }, [initialLanguage]);

  // When a skill opens or changes, ensure audio narration is playing immediately
  useEffect(() => {
    if (skill) {
      const activeLang = selectedLang || initialLanguage || 'te';
      const translation = getActiveTranslation(skill.id, activeLang);
      const textToSpeak = translation ? translation.voice_script : skill.voice_script;

      // Start voice playback immediately if not already playing this skill
      VoiceService.playSkillVoice(skill.id, textToSpeak, activeLang);
    } else {
      VoiceService.stop();
    }
  }, [skill?.id]);

  if (!skill) return null;

  const IconComponent = ICON_MAP[skill.icon] || Sparkles;
  const isCurrentSkillPlaying = voiceState.isPlaying && voiceState.currentSkillId === skill.id;
  const isCurrentSkillPaused = voiceState.isPaused && voiceState.currentSkillId === skill.id;

  const activeContent = getActiveTranslation(skill.id, selectedLang);

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    const newTranslation = getActiveTranslation(skill.id, lang);
    VoiceService.playSkillVoice(skill.id, newTranslation.voice_script, lang);
  };

  const handlePlayVoice = () => {
    if (isCurrentSkillPaused) {
      VoiceService.resume();
    } else {
      VoiceService.playSkillVoice(skill.id, activeContent.voice_script, selectedLang);
    }
  };

  const handlePauseVoice = () => {
    VoiceService.pause();
  };

  const handleStopVoice = () => {
    VoiceService.stop();
  };

  const handleReplayVoice = () => {
    VoiceService.playSkillVoice(skill.id, activeContent.voice_script, selectedLang);
  };

  const handleSpeedChange = (speed: number) => {
    VoiceService.setSpeechRate(speed);
    if (isCurrentSkillPlaying) {
      VoiceService.playSkillVoice(skill.id, activeContent.voice_script, selectedLang);
    }
  };

  // Split active voice script into words for real-time karaoke highlight
  const scriptWords = activeContent.voice_script.split(/\s+/).filter((w) => w.length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            VoiceService.stop();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all"
        />

        {/* 3D Glass Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#080d1a]/95 border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.2)] backdrop-blur-2xl overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Language Indicator & Close Button */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.03] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-300">
                Skills Galaxy • Multilingual Voice
              </span>
            </div>
            
            <button
              onClick={() => {
                VoiceService.stop();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Multilingual Selector Header Banner */}
          <div className="px-5 sm:px-8 py-3 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950/40 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>Select Audio & Explanation Language:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                        : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border border-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-7">
            {/* Grid Layout: Left Visual & Right Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: 3D Visual & Header */}
              <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                {/* 3D Glowing Icon Orb */}
                <div className="relative w-28 h-28 mb-5 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/40 to-amber-500/40 blur-xl transition-opacity ${
                      isCurrentSkillPlaying ? 'opacity-100 scale-110 animate-pulse' : 'opacity-40'
                    }`}
                  />
                  <div className="relative w-24 h-24 rounded-2xl bg-white/[0.06] border border-cyan-400/50 flex items-center justify-center shadow-2xl backdrop-blur-xl">
                    <IconComponent className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1.5">
                  {activeContent.title}
                </h3>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 uppercase tracking-widest mb-3">
                  {skill.category}
                </span>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeContent.short_description}
                </p>

                {/* Voice Profile Indicator */}
                <div className="mt-5 pt-3.5 border-t border-white/10 w-full flex items-center justify-center gap-2 text-[10px] font-mono text-cyan-300/90 uppercase tracking-wider">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>
                    {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.nativeName} AI Voice
                  </span>
                </div>
              </div>

              {/* Right Column: Detailed Breakdown (What is it, Why useful, What I do) */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                {/* 1. What is it? */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-colors">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    What is it? / ఇది ఏమిటి?
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {activeContent.what_is_it}
                  </p>
                </div>

                {/* 2. Why is it useful? */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-400/30 transition-colors">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-violet-400 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    Why is it useful? / ఎందుకు ఉపయోగపడుతుంది?
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {activeContent.why_useful}
                  </p>
                </div>

                {/* 3. What I do */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-colors">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    What I do / మేము ఏమి చేస్తాము?
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {activeContent.what_i_do}
                  </p>
                </div>

                {/* Social Media Project Examples if applicable */}
                {skill.social_examples && skill.social_examples.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.035] border border-cyan-400/30">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 flex items-center gap-2 mb-3">
                      <Instagram className="w-4 h-4 text-pink-400" />
                      Live Social Management Examples
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skill.social_examples.map((item, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold text-sm text-white">@{item.handle}</span>
                              <span className="text-[9px] font-mono uppercase font-bold text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                                {item.platform}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-normal mb-3 font-light">
                              {item.description}
                            </p>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <span>Visit Profile</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Listen to Explanation - Voice System Player */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white/[0.035] border border-cyan-400/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Background Glow */}
              <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Player Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-400">
                      <Volume2 className="w-4 h-4" />
                    </span>
                    <h4 className="text-base font-bold text-white font-heading">
                      Voice Explanation •{' '}
                      <span className="text-amber-300">
                        {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.nativeName}
                      </span>
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Natural multilingual speech with real-time word highlight
                  </p>
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="flex items-center gap-1 h-8 px-3 py-1 rounded-lg bg-black/40 border border-white/10">
                  {voiceState.audioData.map((height, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height:
                          isCurrentSkillPlaying && !isCurrentSkillPaused ? `${height}px` : '6px',
                      }}
                      transition={{ duration: 0.1 }}
                      className={`w-1 rounded-full ${
                        isCurrentSkillPlaying
                          ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Karaoke Text Highlighting Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/10 max-h-48 overflow-y-auto mb-5">
                <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-light">
                  {scriptWords.map((word, idx) => {
                    const isSpoken = isCurrentSkillPlaying && idx < voiceState.currentWordIndex;
                    const isCurrent = isCurrentSkillPlaying && idx === voiceState.currentWordIndex;

                    return (
                      <span
                        key={idx}
                        className={`transition-all duration-150 rounded px-1 inline-block mr-1.5 ${
                          isCurrent
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold scale-105 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                            : isSpoken
                            ? 'text-cyan-300 font-medium'
                            : 'text-slate-400'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              </div>

              {/* Voice Player Controls & Speed Adjustment */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {/* Play, Pause, Replay, Stop */}
                <div className="flex items-center gap-2.5">
                  {!isCurrentSkillPlaying || isCurrentSkillPaused ? (
                    <button
                      onClick={handlePlayVoice}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-black bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>
                        {isCurrentSkillPaused
                          ? 'Resume'
                          : `Play in ${SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang)?.nativeName}`}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseVoice}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </button>
                  )}

                  {isCurrentSkillPlaying && (
                    <button
                      onClick={handleStopVoice}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                      title="Stop"
                    >
                      <Square className="w-4 h-4 fill-current" />
                    </button>
                  )}

                  <button
                    onClick={handleReplayVoice}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                    title="Replay Voice"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Speed Controls (0.8x, 1x, 1.2x) */}
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono">Speed:</span>
                  {[0.85, 0.95, 1.15].map((speed) => {
                    const isSelected = Math.abs(voiceState.speechRate - speed) < 0.05;
                    const label = speed < 0.9 ? '0.8x' : speed < 1.0 ? '1.0x' : '1.2x';
                    return (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-400 text-black shadow-[0_0_10px_#22d3ee]'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
