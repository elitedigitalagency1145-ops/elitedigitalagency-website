import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EliteLogo } from './EliteLogo';

interface Intro3DProps {
  onComplete: () => void;
}

export const Intro3D: React.FC<Intro3DProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(1);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence timer: Total ~1.8s
    const t1 = setTimeout(() => setPhase(2), 350);  // particles & cyber geometry
    const t2 = setTimeout(() => setPhase(3), 850);  // glowing logo formation
    const t3 = setTimeout(() => setPhase(4), 1400); // camera swoosh & entrance reveal
    const t4 = setTimeout(() => {
      setIsDismissing(true);
      setTimeout(onComplete, 400);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissing(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] overflow-hidden"
        >
          {/* Futuristic grid scanline background */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
          
          {/* Glowing orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: 0 }}
              animate={{
                scale: phase >= 2 ? [0.4, 1.2, 1] : 0.4,
                opacity: phase >= 2 ? [0, 0.6, 0.3] : 0,
                rotate: 180,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-[450px] h-[450px] rounded-full border border-cyan-500/30 border-dashed"
            />
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: 0 }}
              animate={{
                scale: phase >= 3 ? [0.6, 1.4, 1.1] : 0.6,
                opacity: phase >= 3 ? [0, 0.5, 0.2] : 0,
                rotate: -180,
              }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute w-[600px] h-[600px] rounded-full border border-violet-500/20"
            />
          </div>

          {/* Central Logo & Typography Reveal */}
          <div className="relative z-10 text-center px-4 max-w-xl mx-auto flex flex-col items-center">
            {/* 3D Crest Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: 90 }}
              animate={{
                scale: phase >= 2 ? 1 : 0,
                opacity: phase >= 2 ? 1 : 0,
                rotateY: phase >= 3 ? 0 : 90,
              }}
              transition={{ duration: 0.8, type: 'spring', damping: 15 }}
              className="mb-6 flex flex-col items-center"
            >
              <div className="p-3.5 rounded-3xl bg-white/[0.05] border border-white/20 backdrop-blur-2xl shadow-[0_0_60px_rgba(245,158,11,0.25)]">
                <EliteLogo size="lg" showGlow={true} animated={true} />
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
              animate={{
                y: phase >= 3 ? 0 : 20,
                opacity: phase >= 3 ? 1 : 0,
                filter: phase >= 3 ? 'blur(0px)' : 'blur(10px)',
              }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-wider uppercase text-white font-heading"
            >
              ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">DIGITAL AGENCY</span>
            </motion.h1>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase >= 4 ? 1 : 0,
                y: phase >= 4 ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300/80"
            >
              AI • Automation • Creativity • 3D Experiences
            </motion.p>

            {/* Futuristic Progress Bar */}
            <div className="w-48 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 1 ? '20%' : phase === 2 ? '50%' : phase === 3 ? '85%' : '100%' }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
              />
            </div>
          </div>

          {/* Quick Skip Control */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-xs font-medium tracking-wider text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
