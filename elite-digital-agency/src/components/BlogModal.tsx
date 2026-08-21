import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, Eye, Share2, Check, ArrowLeft, 
  Sparkles, BookOpen, Send, PhoneCall, ExternalLink, Bookmark, MessageSquare
} from 'lucide-react';
import { BlogPost } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';

interface BlogModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onOpenContact?: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  blog,
  onClose,
  currentLanguage,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [readProgress, setReadProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const target = e.target;
      if (target) {
        const total = target.scrollHeight - target.clientHeight;
        if (total > 0) {
          setReadProgress((target.scrollTop / total) * 100);
        }
      }
    };

    const container = document.getElementById('blog-modal-content');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [blog]);

  if (!blog) return null;

  const isTelugu = currentLanguage === 'te';
  const title = isTelugu && blog.title_te ? blog.title_te : blog.title;
  const excerpt = isTelugu && blog.excerpt_te ? blog.excerpt_te : blog.excerpt;
  const content = isTelugu && blog.content_te ? blog.content_te : blog.content;
  const takeaways = isTelugu && blog.key_takeaways_te ? blog.key_takeaways_te : blog.key_takeaways;

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.origin + `#blog-${blog.slug}`;
    const text = `${title} - Read on Elite Digital Agency: ${url}`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.article
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-[#070e24] border border-cyan-500/30 rounded-[28px] shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-slate-100"
        >
          {/* Top Reading Progress Bar */}
          <div className="w-full h-1 bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-150"
              style={{ width: `${readProgress}%` }}
            />
          </div>

          {/* Sticky Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#060c20]/90 backdrop-blur-md shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isTelugu ? 'తిరిగి బ్లాగ్స్ కు' : 'Back to Articles'}</span>
            </button>

            {/* Category Tag */}
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {blog.category}
            </span>

            {/* Share / Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('copy')}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Article Body */}
          <div
            id="blog-modal-content"
            className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 max-h-[calc(92vh-70px)] scrollbar-thin scrollbar-thumb-cyan-500/20"
          >
            {/* Cover Image & Metadata */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[21/9] max-h-[340px] shadow-lg group">
              <img
                src={blog.cover_image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-black/30 to-transparent" />
              
              {/* Floating badges on cover */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {blog.published_at}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {blog.read_time}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    {blog.views_count || 1200}+ {isTelugu ? 'వీక్షణలు' : 'views'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Article Title */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white leading-tight tracking-tight">
                {title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans border-l-2 border-amber-400 pl-3 italic">
                {excerpt}
              </p>
            </div>

            {/* Author Credit */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-xl bg-slate-800 p-1 border border-cyan-500/30"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-200 font-heading">{blog.author.name}</h4>
                <p className="text-[11px] text-slate-400">{blog.author.role}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Key Takeaways Box (SEO Golden Snippet) */}
            {takeaways && takeaways.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-cyan-500/5 to-transparent border border-amber-400/30 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>{isTelugu ? 'ముఖ్యమైన అంశాలు (Key Takeaways):' : 'Key Takeaways & Highlights:'}</span>
                </div>
                <ul className="space-y-2">
                  {takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formatted Article Content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
              {content.split('\n\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('### ')) {
                  return (
                    <h2 key={index} className="text-lg sm:text-xl font-heading font-black text-amber-300 pt-2 border-b border-white/10 pb-1">
                      {trimmed.replace('### ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('#### ')) {
                  return (
                    <h3 key={index} className="text-base sm:text-lg font-heading font-bold text-cyan-300 pt-2">
                      {trimmed.replace('#### ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n');
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-200">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* SEO Tags Cloud */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isTelugu ? 'సంబంధిత అంశాలు & ట్యాగ్‌లు:' : 'Related Topics & SEO Tags:'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-white/[0.05] border border-white/10 text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Agency CTA Box inside Blog */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-[#0a1532] to-amber-950/40 border border-cyan-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm sm:text-base font-heading font-bold text-white">
                  {isTelugu ? 'మీ బిజినెస్‌లో ఈ AI టెక్నాలజీని అమర్చాలనుకుంటున్నారా?' : 'Ready to Implement This in Your Business?'}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {isTelugu
                    ? 'ఎలైట్ డిజిటల్ ఏజెన్సీతో ఉచిత 15 నిమిషాల AI కన్సల్టేషన్ బుక్ చేసుకోండి.'
                    : 'Get custom AI automation, Google Maps setup, or website development tailored for your goals.'}
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenContact) onOpenContact();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-all cursor-pointer shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'సంప్రదించండి' : 'Get in Touch'}</span>
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </AnimatePresence>
  );
};
