import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ExternalLink, Share2, Eye, ArrowUpRight } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onShareProject: (project: Project) => void;
  currentLanguage?: SupportedLanguage;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onShareProject,
  currentLanguage = 'te',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  const categories: (string | ProjectCategory)[] = [
    'All',
    'AI Automation',
    'AI Calling Agents',
    'Local SEO & Maps',
    'AI Agent',
    'AI Chatbot',
    'AI Videos',
    'Websites',
    'Social Media Management',
    'Meta Ads',
    'Wedding Invitation Videos',
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.projects.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
          >
            {t.projects.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-300 font-light leading-relaxed"
          >
            {t.projects.description}
          </motion.p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const catLabel = t.projects.categories[cat] || cat;
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

        {/* 3D Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="group relative rounded-2xl bg-white/[0.035] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)] backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Thumbnail Image */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative w-full h-56 overflow-hidden bg-[#0a0f1d] cursor-pointer"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 border border-cyan-400/30 text-cyan-300 backdrop-blur-md shadow-md">
                  {t.projects.categories[project.category] || project.category}
                </span>

                {/* Hover Quick View Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs">
                  <div className="px-4 py-2 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Explore Project</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors cursor-pointer mb-2.5 line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300/80 leading-relaxed font-light mb-5 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Action Buttons */}
                <div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/10 text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.projects.viewProject}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareProject(project);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                      title={t.projects.shareProject}
                    >
                      <Share2 className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
