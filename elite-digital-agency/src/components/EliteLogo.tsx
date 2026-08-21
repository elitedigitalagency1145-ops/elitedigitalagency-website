import React from 'react';

interface EliteLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showGlow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export const EliteLogo: React.FC<EliteLogoProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
  animated = true,
  onClick,
}) => {
  // Determine pixel size
  let pixelSize = 80;
  if (typeof size === 'number') {
    pixelSize = size;
  } else {
    switch (size) {
      case 'xs':
        pixelSize = 32;
        break;
      case 'sm':
        pixelSize = 44;
        break;
      case 'md':
        pixelSize = 80;
        break;
      case 'lg':
        pixelSize = 140;
        break;
      case 'xl':
        pixelSize = 240;
        break;
    }
  }

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {/* Ambient Blue & Gold Glow behind the emblem */}
      {showGlow && (
        <>
          <div
            className={`absolute inset-0 rounded-full bg-cyan-500/30 blur-xl pointer-events-none ${
              animated ? 'animate-pulse' : ''
            }`}
            style={{ transform: 'scale(1.2)' }}
          />
          <div
            className="absolute inset-0 rounded-full bg-amber-400/25 blur-2xl pointer-events-none"
            style={{ transform: 'scale(1.1)' }}
          />
        </>
      )}

      {/* Official 3D Crest Logo Image */}
      <img
        src="/elite-logo.svg"
        alt="Elite Digital Agency Official Logo Emblem"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
          animated ? 'hover:scale-105' : ''
        }`}
        style={{ width: pixelSize, height: pixelSize }}
      />
    </div>
  );
};
