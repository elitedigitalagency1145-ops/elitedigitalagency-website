import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
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
  Volume2,
  ArrowUpRight,
  Languages,
} from 'lucide-react';
import { Skill } from '../types';
import { VoiceService } from '../lib/voiceService';
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  SKILL_TRANSLATIONS,
} from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface SkillsSectionProps {
  skills: Skill[];
  activeLanguage?: SupportedLanguage | string;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onSelectSkill: (skill: Skill) => void;
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

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  activeLanguage = 'te',
  onLanguageChange,
  onSelectSkill,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const currentLang = (activeLanguage as SupportedLanguage) || 'te';

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.te;

  const categories = [
    'All',
    'AI & Automation',
    'Local Growth & Maps',
    'Development',
    'Marketing',
    'Creative & Video',
    'Creative & Design',
  ];

  const handleLangSelect = (lang: SupportedLanguage) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const filteredSkills = skills.filter((s) => {
    if (!s.enabled) return false;
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Cyber Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.skills.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
          >
            {t.skills.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-300 font-light leading-relaxed"
          >
            {t.skills.description}
          </motion.p>

          {/* Multilingual Voice Selector Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-8 p-3 rounded-2xl bg-white/[0.035] border border-cyan-400/30 inline-flex flex-col sm:flex-row items-center gap-3 backdrop-blur-xl shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 px-2">
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{t.skills.audioLanguageLabel}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLangSelect(lang.code)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-bold shadow-[0_0_18px_rgba(245,158,11,0.6)] scale-105'
                        : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border border-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const catLabel = t.skills.categories[cat] || cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-400 text-black font-bold shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                      : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10 backdrop-blur-md'
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => {
            const IconComponent = ICON_MAP[skill.icon] || Sparkles;
            const translation =
              SKILL_TRANSLATIONS[skill.id] && SKILL_TRANSLATIONS[skill.id][currentLang]
                ? SKILL_TRANSLATIONS[skill.id][currentLang]
                : null;

            const displayTitle = translation ? translation.title : skill.title;
            const displayDesc = translation ? translation.short_description : skill.short_description;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                onClick={() => {
                  const scriptToSpeak = translation ? translation.voice_script : skill.voice_script;
                  VoiceService.playSkillVoice(skill.id, scriptToSpeak, currentLang);
                  onSelectSkill(skill);
                }}
                className="group relative p-6 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)] backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Glowing Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-tr-2xl rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                <div>
                  {/* Top Bar: 3D Icon & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/60 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                      <IconComponent className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      0{skill.display_order}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                      {t.skills.categories[skill.category] || skill.category}
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-6 line-clamp-3">
                    {displayDesc}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-amber-300 transition-colors font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span className="text-[11px]">
                      {SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.nativeName} Audio
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold text-[11px] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                    <span>{t.skills.tapToListen}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
