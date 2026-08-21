import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, Layout, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface AboutSectionProps {
  onExploreSkills: () => void;
  currentLanguage?: SupportedLanguage;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreSkills,
  currentLanguage = 'te',
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  const pillars = [
    {
      id: 'ai-agents',
      title: t.about.pillars.aiAgents.title,
      icon: Bot,
      color: 'from-cyan-500/20 to-blue-600/20',
      borderColor: 'group-hover:border-cyan-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      iconColor: 'text-cyan-400',
      description: t.about.pillars.aiAgents.description,
      highlights: t.about.pillars.aiAgents.highlights,
    },
    {
      id: 'maps-local',
      title: t.about.pillars.googleMaps.title,
      icon: Layout,
      color: 'from-amber-500/20 to-orange-600/20',
      borderColor: 'group-hover:border-amber-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      iconColor: 'text-amber-400',
      description: t.about.pillars.googleMaps.description,
      highlights: t.about.pillars.googleMaps.highlights,
    },
    {
      id: 'web',
      title: t.about.pillars.web3d.title,
      icon: Sparkles,
      color: 'from-blue-500/20 to-indigo-600/20',
      borderColor: 'group-hover:border-blue-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
      iconColor: 'text-blue-400',
      description: t.about.pillars.web3d.description,
      highlights: t.about.pillars.web3d.highlights,
    },
    {
      id: 'growth',
      title: t.about.pillars.metaAds.title,
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-600/20',
      borderColor: 'group-hover:border-emerald-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      iconColor: 'text-emerald-400',
      description: t.about.pillars.metaAds.description,
      highlights: t.about.pillars.metaAds.highlights,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
          >
            {t.about.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-light"
          >
            {t.about.description}
          </motion.p>
        </div>

        {/* 4 Animated 3D Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                className="group relative p-8 rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2.5">
                  {pillar.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-300">
                      <CheckCircle2 className={`w-4 h-4 ${pillar.iconColor} shrink-0`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Skills Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onExploreSkills}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-cyan-400/50 backdrop-blur-xl text-xs font-bold tracking-widest uppercase text-cyan-300 hover:text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-pointer hover:scale-105"
          >
            <span>{t.about.exploreSkillsBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
