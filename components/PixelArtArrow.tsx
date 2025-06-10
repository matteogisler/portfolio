import React from 'react';

interface PixelArtArrowProps {
  direction: 'left' | 'up' | 'right' | 'down';
  color?: string;
  size?: number;
}

const getRotation = (direction: 'left' | 'up' | 'right' | 'down') => {
  switch (direction) {
    case 'left':
      return 'rotate(-90 16 16)';
    case 'up':
      return undefined;
    case 'right':
      return 'rotate(90 16 16)';
    case 'down':
      return 'rotate(180 16 16)';
    default:
      return undefined;
  }
};

const getColors = (baseColor: string) => {
  // Create lighter and darker variants for pixel art shading
  const colors = {
    '#3b82f6': { light: '#60a5fa', main: '#3b82f6', dark: '#1d4ed8', shadow: '#1e3a8a' },
    '#ef4444': { light: '#f87171', main: '#ef4444', dark: '#dc2626', shadow: '#991b1b' },
    '#10b981': { light: '#34d399', main: '#10b981', dark: '#059669', shadow: '#065f46' },
    '#f59e0b': { light: '#fbbf24', main: '#f59e0b', dark: '#d97706', shadow: '#92400e' },
    '#8b5cf6': { light: '#a78bfa', main: '#8b5cf6', dark: '#7c3aed', shadow: '#5b21b6' },
  };
  
  return colors[baseColor as keyof typeof colors] || {
    light: baseColor,
    main: baseColor,
    dark: baseColor,
    shadow: baseColor
  };
};

export default function PixelArtArrow({ direction, color = '#3b82f6', size = 64 }: PixelArtArrowProps) {
  const colors = getColors(color);
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      <defs>
        <filter id="pixelShadow" x="-2" y="-2" width="36" height="36">
          <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      
      <g transform={getRotation(direction)} filter="url(#pixelShadow)">
        {/* Arrow head - pixel perfect triangular shape */}
        <g>
          {/* Top row of arrow head */}
          <rect x="15" y="4" width="2" height="2" fill={colors.light} />
          
          {/* Second row */}
          <rect x="13" y="6" width="2" height="2" fill={colors.light} />
          <rect x="15" y="6" width="2" height="2" fill={colors.main} />
          <rect x="17" y="6" width="2" height="2" fill={colors.dark} />
          
          {/* Third row */}
          <rect x="11" y="8" width="2" height="2" fill={colors.light} />
          <rect x="13" y="8" width="2" height="2" fill={colors.main} />
          <rect x="15" y="8" width="2" height="2" fill={colors.main} />
          <rect x="17" y="8" width="2" height="2" fill={colors.dark} />
          <rect x="19" y="8" width="2" height="2" fill={colors.shadow} />
          
          {/* Fourth row */}
          <rect x="9" y="10" width="2" height="2" fill={colors.light} />
          <rect x="11" y="10" width="2" height="2" fill={colors.main} />
          <rect x="13" y="10" width="2" height="2" fill={colors.main} />
          <rect x="15" y="10" width="2" height="2" fill={colors.main} />
          <rect x="17" y="10" width="2" height="2" fill={colors.dark} />
          <rect x="19" y="10" width="2" height="2" fill={colors.dark} />
          <rect x="21" y="10" width="2" height="2" fill={colors.shadow} />
        </g>
        
        {/* Arrow shaft */}
        <g>
          {/* Left highlight column */}
          <rect x="13" y="12" width="2" height="16" fill={colors.light} />
          {/* Main shaft columns */}
          <rect x="15" y="12" width="2" height="16" fill={colors.main} />
          {/* Right shadow column */}
          <rect x="17" y="12" width="2" height="16" fill={colors.dark} />
        </g>
        
        {/* Bottom cap for shaft */}
        <rect x="13" y="28" width="6" height="2" fill={colors.shadow} />
      </g>
    </svg>
  );
}