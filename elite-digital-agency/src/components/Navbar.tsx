import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Shield, Lock, ChevronRight, UserCheck } from 'lucide-react';
import { AgencySettings } from '../types';
import { EliteLogo } from './EliteLogo';
import { SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  settings: AgencySettings;
  currentLanguage?: SupportedLanguage;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdmin,
  settings,
  currentLanguage = 'te',
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t.navbar.home || 'Home' },
    { id: 'skills', label: t.navbar.skills || 'Skills' },
    { id: 'projects', label: t.navbar.projects || 'Projects' },
    { id: 'blogs', label: t.navbar.blogs || 'Blogs' },
    { id: 'contact', label: t.navbar.contact || 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const handleAdminClick = () => {
    setMenuOpen(false);
    onOpenAdmin();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-2.5 ${
        isScrolled
          ? 'backdrop-blur-2xl bg-[#040814]/90 border-b border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
          : 'bg-[#030610]/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo + Single Word Colorful Title + Separate Nav Bars right next to it */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Brand Logo & Single Word Colorful Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <EliteLogo size="xs" showGlow={true} animated={true} />
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-sm sm:text-[15px] tracking-tight bg-gradient-to-r from-amber-300 via-amber-100 via-cyan-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(34,211,238,0.35)] group-hover:brightness-125 transition-all">
                elitedigitalagency
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
          </button>

          {/* Desktop Navigation: Separate Distinct Bars for each item */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-xl border backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-purple-600/25 text-cyan-300 border-cyan-400/70 shadow-[0_0_18px_rgba(34,211,238,0.4)] scale-105'
                      : 'bg-[#070d1d]/85 text-slate-300 hover:text-white border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Three Lines Menu Button (Containing Admin Login) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer border ${
              menuOpen
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/15 hover:border-cyan-400/40 text-slate-200 hover:text-white'
            }`}
            aria-label="Open Menu"
            title="Menu & Admin Login"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <div className="flex items-center gap-2">
                {/* 3 Lines Icon */}
                <Menu className="w-5 h-5 text-amber-400" />
                <span className="text-[11px] font-semibold tracking-wider text-slate-300 hidden sm:inline">
                  MENU
                </span>
              </div>
            )}
          </button>

          {/* Three Lines Dropdown Menu with Admin Login */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#070c1a]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-3 z-50 overflow-hidden"
              >
                {/* Mobile Navigation Links (if on small screen) */}
                <div className="md:hidden flex flex-col gap-1 pb-2.5 mb-2.5 border-b border-white/10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 px-2.5 py-1">
                    Navigation
                  </span>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase text-left transition-colors flex items-center justify-between ${
                        activeSection === item.id
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30'
                          : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  ))}
                </div>

                {/* Admin Login Section */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400/90 px-2.5 pt-1">
                    Control Center
                  </span>

                  <button
                    onClick={handleAdminClick}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 border border-amber-400/40 hover:border-amber-300 text-white transition-all duration-200 flex items-center gap-3 cursor-pointer group shadow-lg"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                      <Lock className="w-4 h-4 text-amber-300" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-amber-200">
                          Admin Login
                        </span>
                        <Shield className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-300">
                        Access Agency Dashboard
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

