import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Share2,
  Check,
  Sparkles,
  Layers,
  Copy,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Workflow,
  Zap,
  TrendingUp,
  ArrowRight,
  Globe,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContactClick }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'preview' | 'link'>('preview');

  if (!project) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://elitedigitalagency.com';
  const shareTitle = `${project.title} | Elite Digital Agency`;
  const shareText = `Check out this project: ${project.title} by Elite Digital Agency`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        console.warn('Share cancelled or failed', err);
      }
    } else {
      setShareMenuOpen((prev) => !prev);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(project.project_url || currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + (project.project_url || currentUrl))}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.project_url || currentUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(project.project_url || currentUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(project.project_url || currentUrl)}`, '_blank');
  };

  // Helper to get YouTube Embed URL if provided
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0` : null;
    } catch {
      return null;
    }
  };

  const ytEmbed = getYouTubeEmbedUrl(project.youtube_url || (project.video_url?.includes('youtube') ? project.video_url : undefined));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-all"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-4xl bg-[#060b18]/98 border border-cyan-500/30 rounded-3xl shadow-[0_0_90px_rgba(34,211,238,0.25)] backdrop-blur-3xl overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-white/[0.03] shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300">
                  Project Details & Architecture
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono font-bold text-[10px] uppercase tracking-wider">
                {project.category}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-7 custom-scrollbar">
            {/* Project Header Title */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Media Presentation Display Area */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#030712] border border-white/15 shadow-2xl">
              {/* Media Condition 1: YouTube Embed */}
              {ytEmbed ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={ytEmbed}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : project.media_type === 'video' && project.video_url ? (
                /* Media Condition 2: Direct Video Player */
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                  <video
                    src={project.video_url}
                    poster={project.image_url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                /* Media Condition 3: High-Res Project Visual/Image */
                <div className="relative w-full h-64 sm:h-[380px] overflow-hidden group">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent opacity-70" />
                  
                  {project.project_url && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/80 hover:bg-black text-cyan-300 border border-cyan-400/40 backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
                      >
                        <Globe className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Live Preview Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* How It Works (ఎలా పని చేస్తుంది) Section */}
            {project.how_it_works && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-[#0a1226]/80 to-purple-950/20 border border-cyan-500/25 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                      How this Project Works • పని చేసే విధానం
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400/90 tracking-wide">
                      ARCHITECTURE & WORKFLOW EXPLANATION
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {project.how_it_works}
                </p>

                {/* Step-by-Step Workflow Pipeline */}
                {project.workflow_steps && project.workflow_steps.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.workflow_steps.map((item, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-mono font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                          {item.step || sIdx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Key Capabilities & Impact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm font-heading">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Key Capabilities & Features</span>
                  </div>
                  <ul className="space-y-2">
                    {project.key_features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Business Impact / Results */}
              {project.results && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/30 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm font-heading">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <span>Business Impact & Results</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 font-light leading-relaxed mt-2.5">
                      {project.results}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-400/20 flex items-center gap-2 text-[11px] text-amber-300 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Real-World Deployment</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tags Pill Cloud */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Technologies & Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/10 text-cyan-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Menu Accordion */}
            {shareMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 rounded-2xl bg-[#091024] border border-cyan-400/30 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Share this project
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white transition-colors cursor-pointer border border-white/15"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={shareToWhatsApp}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 text-xs font-semibold text-emerald-300 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={shareToLinkedIn}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-500/40 hover:bg-blue-500/25 text-xs font-semibold text-blue-300 transition-colors cursor-pointer"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </button>

                  <button
                    onClick={shareToTwitter}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/15 border border-sky-500/40 hover:bg-sky-500/25 text-xs font-semibold text-sky-300 transition-colors cursor-pointer"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/40 hover:bg-indigo-500/25 text-xs font-semibold text-indigo-300 transition-colors cursor-pointer"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.45)] transition-all cursor-pointer hover:scale-105"
                  >
                    <span>Visit Live Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={handleNativeShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-cyan-400 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>Share Project</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Elite Digital Agency • Official Showcase
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
