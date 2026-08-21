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
  onClick,
}) => {
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
        pixelSize = 64;
        break;
      case 'lg':
        pixelSize = 96;
        break;
      case 'xl':
        pixelSize = 128;
        break;
      default:
        pixelSize = 64;
    }
  }

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <img
        src="/elite-logo.jpeg"
        alt="Elite Digital Agency Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: showGlow ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))' : 'none',
        }}
      />
    </div>
  );
};

export default EliteLogo;
