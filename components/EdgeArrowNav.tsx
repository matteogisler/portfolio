import React from 'react';
import PixelArtArrow from './PixelArtArrow';

interface EdgeArrowNavProps {
  onArrowClick: (direction: 'left' | 'up' | 'right') => void;
  leftLabel?: string;
  upLabel?: string;
  rightLabel?: string;
}

const overlayStyle =
  'fixed z-40 flex flex-col items-center justify-center cursor-pointer transition-all';

export default function EdgeArrowNav({ onArrowClick, leftLabel = 'Projects', upLabel = 'About', rightLabel = 'Contact' }: EdgeArrowNavProps) {
  return (
    <>
      {/* Left Overlay */}
      <div
        className={`${overlayStyle} left-0 top-1/2 -translate-y-1/2 w-24 h-44 bg-white/60 backdrop-blur-md rounded-r-2xl shadow-lg group`}
        onClick={() => onArrowClick('left')}
      >
        <div className="transition-transform group-hover:scale-110 group-active:scale-95">
          <PixelArtArrow direction="left" color="#60a5fa" />
        </div>
        <div className="mt-2 text-xs pixel-font text-blue-900 font-bold drop-shadow-sm text-center">
          {leftLabel}
        </div>
      </div>
      {/* Top Overlay */}
      <div
        className={`${overlayStyle} top-0 left-1/2 -translate-x-1/2 w-44 h-22 bg-white/60 backdrop-blur-md rounded-b-2xl pb-2 shadow-lg group flex-col`}
        onClick={() => onArrowClick('up')}
      >
        <div className="transition-transform group-hover:scale-110 group-active:scale-95">
          <PixelArtArrow direction="up" color="#60a5fa" />
        </div>
        <div className="mt-2 text-xs pixel-font text-blue-900 font-bold drop-shadow-sm text-center">
          {upLabel}
        </div>
      </div>
      {/* Right Overlay */}
      <div
        className={`${overlayStyle} right-0 top-1/2 -translate-y-1/2 w-24 h-44 bg-white/60 backdrop-blur-md rounded-l-2xl shadow-lg group`}
        onClick={() => onArrowClick('right')}
      >
        <div className="transition-transform group-hover:scale-110 group-active:scale-95">
          <PixelArtArrow direction="right" color="#60a5fa" />
        </div>
        <div className="mt-2 text-xs pixel-font text-blue-900 font-bold drop-shadow-sm text-center">
          {rightLabel}
        </div>
      </div>
    </>
  );
} 