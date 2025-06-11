import React from 'react';

interface LoadingScreenProps {
  progress: number; // 0 to 100
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  // Game Boy palette
  const filledColor = '#9bbc0f'; // filled bar
  const emptyColor = '#8bac0f'; // empty bar
  const borderColor = '#306230'; // border
  const bgColor = '#0f380f'; // background

  const totalBlocks = 16;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: bgColor }}>
      <div className="mb-4 text-4xl font-bold text-white pixel-font tracking-widest">
        LOADING...
      </div>
      <div
        className="flex items-center p-2 rounded"
        style={{
          background: bgColor,
          border: `4px double ${borderColor}`,
          boxShadow: `0 0 8px ${borderColor}`,
        }}
      >
        {[...Array(totalBlocks)].map((_, i) => (
          <div
            key={i}
            className="mx-0.5 h-6 w-4 rounded-sm"
            style={{
              background: i < filledBlocks ? filledColor : emptyColor,
              border: `1.5px solid ${borderColor}`,
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      <div className="mt-4 text-2xl font-bold pixel-font" style={{ color: filledColor }}>
        {progress}%
      </div>
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('/fonts/PressStart2P-Regular.ttf') format('truetype');
          font-display: swap;
        }
        .pixel-font {
          font-family: 'PixelFont', monospace;
        }
      `}</style>
    </div>
  );
} 