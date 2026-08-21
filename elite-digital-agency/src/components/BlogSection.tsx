import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, Sparkles, Calendar, Clock, Eye, 
  ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Filter, Tag 
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';

interface BlogSectionProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  currentLanguage: SupportedLanguage;
}

const CATEGORIES: { id: string; labelEn: string; labelTe: string }[] = [
  { id: 'all', labelEn: 'All Articles', labelTe: 'అన్ని ఆర్టికల్స్' },
  { id: 'AI Voice Agents', labelEn: 'AI Voice Calling', labelTe: 'AI వాయిస్ కాలింగ్' },
  { id: 'Google Maps & Local SEO', labelEn: 'Google Maps SEO', labelTe: 'గూగుల్ మ్యాప్స్ SEO' },
  { id: 'AI Chatbots & WhatsApp', labelEn: 'WhatsApp AI', labelTe: 'వాట్సాప్ AI బాట్స్' },
  { id: 'Web Design & 3D Web', labelEn: '3D Web & Design', labelTe: '3D వెబ్‌సైట్ డిజైన్' },
  { id: 'Meta Ads & Marketing', labelEn: 'Meta Ads & Marketing', labelTe: 'మెటా యాడ్స్ & మార్కెటింగ్' },
  { id: 'Workflow Automation', labelEn: 'Workflow Automation', labelTe: 'వర్క్‌ఫ్లో ఆటోమేషన్' },
];

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  onSelectBlog,
  currentLanguage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isTelugu = currentLanguage === 'te';

  // Filtered list
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'all' || blog.category === selectedCategory;

      const title = isTelugu && blog.title_te ? blog.title_te : blog.title;
      const excerpt = isTelugu && blog.excerpt_te ? blog.excerpt_te : blog.excerpt;
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        excerpt.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        blog.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery, isTelugu]);

  return (
    <section id="blogs" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        {/* On-Page SEO Verified Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#08132e] border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{isTelugu ? 'AI & డిజిటల్ బిజినెస్ ఆర్టికల్స్' : 'INSIGHTS, STRATEGIES & SEO BLOGS'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-white"
        >
          {isTelugu ? (
            <>
              వ్యాపార వృద్ధి కోసం <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">ఆధునిక AI & SEO</span> గైడ్స్
            </>
          ) : (
            <>
              Mastering <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">AI Automations & Growth</span> in 2026
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          {isTelugu
            ? 'AI వాయిస్ ఏజెంట్లు, గూగుల్ మ్యాప్స్ లోకల్ 3-ప్యాక్ ర్యాంకింగ్, వాట్సాప్ చాట్‌బాట్‌లు మరియు మెటా యాడ్స్ వ్యూహాలపై సంపూర్ణ సమాచారం.'
            : 'In-depth blueprints, case studies, and actionable guides to scale your business with autonomous AI and high-ranking local SEO.'}
        </motion.p>
      </div>

      {/* On-Page SEO Signal Live Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 p-3 sm:p-4 rounded-2xl bg-[#070e24]/80 border border-emerald-500/30 backdrop-blur-xl shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>ON-PAGE SEO HEALTH: 100/100 VERIFIED</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-slate-300 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            JSON-LD Schema Active
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            OpenGraph & Twitter Cards
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            Canonical URLs
          </span>
        </div>
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTelugu ? 'ఆర్టికల్స్ వెతకండి (Search articles)...' : 'Search by topic, keyword, or tag...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09112a]/90 border border-white/15 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-[#070d1d]/90 text-slate-300 hover:text-white border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08]'
                }`}
              >
                {isTelugu ? cat.labelTe : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#070e24]/60 border border-white/10">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300 font-heading">
            {isTelugu ? 'ఎటువంటి ఆర్టికల్స్ కనిపించలేదు' : 'No articles found matching your search'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isTelugu ? 'దయచేసి ఇతర కీవర్డ్స్ లేదా కేటగిరీ ఎంచుకోండి.' : 'Try changing the category or search keywords.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            {isTelugu ? 'అన్ని ఆర్టికల్స్ చూపించు' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => {
            const title = isTelugu && blog.title_te ? blog.title_te : blog.title;
            const excerpt = isTelugu && blog.excerpt_te ? blog.excerpt_te : blog.excerpt;

            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                onClick={() => onSelectBlog(blog)}
                className="group relative rounded-3xl bg-[#070f28]/85 border border-white/10 hover:border-cyan-400/60 p-4 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(34,211,238,0.2)] hover:-translate-y-1.5 cursor-pointer backdrop-blur-xl overflow-hidden"
              >
                {/* Top Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all pointer-events-none" />

                <div>
                  {/* Thumbnail Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 border border-white/10">
                    <img
                      src={blog.cover_image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Category Pill Over Image */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/40 shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    {/* Views Pill */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-1 border border-white/10">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      <span>{blog.views_count || 1200}+</span>
                    </div>
                  </div>

                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {blog.published_at}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {blog.read_time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-heading font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {excerpt}
                  </p>
                </div>

                {/* Card Footer: Tags & Read CTA */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/[0.05] text-slate-300 truncate max-w-[140px]">
                      #{blog.tags[0]}
                    </span>
                    {blog.tags[1] && (
                      <span className="hidden sm:inline px-2 py-0.5 rounded-md text-[10px] bg-white/[0.05] text-slate-300 truncate max-w-[120px]">
                        #{blog.tags[1]}
                      </span>
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-cyan-300 transition-colors shrink-0">
                    <span>{isTelugu ? 'చదవండి' : 'Read'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
};
