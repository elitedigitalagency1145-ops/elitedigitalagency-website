import React from 'react';
import { Phone, Mail, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { AgencySettings } from '../types';
import { EliteLogo } from './EliteLogo';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface FooterProps {
  settings: AgencySettings;
  onNavigate: (sectionId: string) => void;
  currentLanguage?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  currentLanguage = 'te',
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: t.navbar.home },
    { id: 'about', label: t.navbar.about },
    { id: 'skills', label: t.navbar.skills },
    { id: 'projects', label: t.navbar.projects },
    { id: 'blogs', label: t.navbar.blogs || 'Blogs' },
    { id: 'contact', label: t.navbar.contact },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <EliteLogo size="sm" showGlow={true} />
              <span className="font-heading font-extrabold text-lg tracking-widest text-white">
                ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400">DIGITAL AGENCY</span>
              </span>
            </div>

            <p className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-cyan-400/90">
              AI • Automation • Maps & Stores • Growth
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-cyan-400 capitalize transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 hover:text-violet-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span className="truncate">{settings.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              {t.footer.socialMedia}
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-pink-400/50 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-white/[0.08] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-red-400/50 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/[0.08] transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Keywords & Location Coverage Bar */}
        <div className="py-6 border-b border-white/10 flex flex-col gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 text-cyan-400/90 font-mono font-bold uppercase tracking-wider text-xs">
            <span>Verified Services & Local SEO Coverage:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-slate-400 font-sans text-[11px] leading-relaxed">
            <span className="text-slate-300">AI Voice Calling Agents</span> •
            <span className="text-slate-300">Telugu AI Voice Bot</span> •
            <span className="text-slate-300">Google Maps Local 3-Pack SEO</span> •
            <span className="text-slate-300">Google Business Profile Verification</span> •
            <span className="text-slate-300">WhatsApp AI Chatbots</span> •
            <span className="text-slate-300">3D Web Development & Three.js</span> •
            <span className="text-slate-300">High-ROAS Meta Ads</span> •
            <span className="text-slate-300">Lead Generation Funnels</span> •
            <span className="text-slate-300">CRM Voice AI Automation</span> •
            <span className="text-slate-300">Local Store Map Setup</span> •
            <span className="text-slate-300">Telugu Digital Marketing</span> •
            <span className="text-slate-300">Autonomous Sales Agents</span>
          </div>
          <div className="text-[10px] text-slate-300 font-mono">
            <span className="text-amber-400/80 font-bold uppercase">Regions Served:</span> Andhra Pradesh (Vijayawada, Visakhapatnam, Guntur, Tirupati), Telangana (Hyderabad, Warangal), Bengaluru, Chennai, Mumbai, Delhi NCR, USA, UK, UAE & Global Remote Clients.
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>{t.footer.rights}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
