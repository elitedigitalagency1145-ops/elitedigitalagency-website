import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AgencySettings } from '../types';
import { StorageService } from '../lib/storage';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface ContactSectionProps {
  settings: AgencySettings;
  currentLanguage?: SupportedLanguage;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  currentLanguage = 'te',
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'AI Automation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const services = [
    'AI Automation',
    'AI Agent',
    'AI Chatbot',
    'AI Video',
    'Website',
    'SEO',
    'Logo',
    'Thumbnail',
    'Poster',
    'Social Media Management',
    'Meta Ads',
    'Wedding Invitation Video',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      StorageService.addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        service: formData.service,
        message: formData.message,
        source: 'Contact Us Form (Website Footer)',
        language: currentLanguage,
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
        });
      } catch (err) {
        // ignore
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'AI Automation',
        message: '',
      });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-300 font-light leading-relaxed"
          >
            {t.contact.description}
          </motion.p>
        </div>

        {/* 2-Column Contact Grid: Left Contact Info, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Clickable Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/[0.035] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white font-heading mb-4">
                {t.contact.directChannels}
              </h3>

              {/* Mobile Phone */}
              <a
                href={`tel:${settings.phone}`}
                className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 block">
                    {t.contact.phoneLabel}
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {settings.phone}
                  </span>
                </div>
              </a>

              {/* Email Address */}
              <a
                href={`mailto:${settings.email}`}
                className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-violet-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 block">
                    {t.contact.emailLabel}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300 transition-colors truncate block">
                    {settings.email}
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 block">
                    Instagram
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    @{settings.instagram_username}
                  </span>
                </div>
              </a>

              {/* YouTube */}
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-red-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/30 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-500/20 transition-all">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 block">
                    YouTube
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
                    {settings.youtube_username}
                  </span>
                </div>
              </a>

              {/* Response Time Guarantee */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{t.contact.responseTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.035] border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.1)] relative">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-white font-heading">
                      {t.contact.thankYou}
                    </h3>
                    <p className="text-base text-slate-200 max-w-md">
                      {t.contact.receivedMessage}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs font-bold uppercase tracking-widest text-cyan-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-white font-heading mb-2">
                      {t.contact.formTitle}
                    </h3>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        {t.contact.yourName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.yourNamePlaceholder}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] text-sm transition-all"
                      />
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          {t.contact.yourEmail} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.contact.yourEmailPlaceholder}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          {t.contact.yourPhone}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.contact.yourPhonePlaceholder}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        {t.contact.serviceInterest} *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0d1527] border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm transition-all cursor-pointer"
                      >
                        {services.map((svc) => (
                          <option key={svc} value={svc} className="bg-[#0d1527] text-white">
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        {t.contact.projectDetails} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contact.projectDetailsPlaceholder}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] text-sm transition-all resize-none"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? t.contact.sending : t.contact.sendMessage}</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
