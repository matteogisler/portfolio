'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import facingLeft from '../app/assets/facing-left-removebg-preview.png';
import facingRight from '../app/assets/facing-right-removebg-preview.png';
import facingBack from '../app/assets/facing-back-removebg-preview.png';
import facingForward from '../app/assets/facing-forward-removebg-preview.png';

type MascotPose = 'idle' | 'walk' | 'jump' | 'speak' | 'wave';
type MascotPosition = 'center' | 'corner' | 'side';

interface MascotProps {
  pose?: MascotPose;
  message?: string;
  position?: MascotPosition;
  onMessageComplete?: () => void;
  typewriterDelay?: number; 
  direction?: 'front' | 'left' | 'right' | 'back';
  xPct?: number; 
  yPct?: number; 
  mascotSizePct?: number; 
}

const Mascot = ({ 
  pose = 'idle', 
  message, 
  position = 'center',
  onMessageComplete,
  typewriterDelay = 600,
  direction = 'front', 
  xPct = 50,
  yPct = 72,
  mascotSizePct = 6,
}: MascotProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPose, setCurrentPose] = useState<MascotPose>(pose);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (message) {
      setCurrentPose('speak');
      setShowMessage(true);
      setDisplayedText('');
      let i = 0;
      let interval: NodeJS.Timeout;
      const timeout = setTimeout(() => {
        interval = setInterval(() => {
          setDisplayedText((prev) => {
            if (i < message.length) {
              i++;
              return message.slice(0, i);
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 55);
      }, typewriterDelay);
      return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
      };
    } else {
      setCurrentPose(pose);
      setShowMessage(false);
      setDisplayedText('');
    }
  }, [message, pose, typewriterDelay]);

  const getMascotAnimation = () => {
    switch (currentPose) {
      case 'walk':
        return {
          x: [0, 2, 0, -2],
          transition: { duration: 0.6, repeat: Infinity }
        };
      case 'jump':
        return {
          y: [0, -20, 0],
          transition: { duration: 0.5 }
        };
      case 'wave':
        return {
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.8, repeat: 2 }
        };
      case 'speak':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 0.5, repeat: 3 }
        };
      default:
        return {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        };
    }
  };

  // Map direction to PNG
  const getMascotImage = () => {
    switch (direction) {
      case 'left':
        return facingLeft.src;
      case 'right':
        return facingRight.src;
      case 'back':
        return facingBack.src;
      case 'front':
      default:
        return facingForward.src;
    }
  };

  return (
    <motion.div
      className={`absolute z-50`}
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: 'translate(-50%, -50%)',
        width: `${mascotSizePct}%`,
        height: `${mascotSizePct}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="speech-bubble pixel-font text-sm mb-4 w-72 px-8 py-5"
          >
            {displayedText}
            <button
              onClick={() => {
                setShowMessage(false);
                onMessageComplete?.();
              }}
              className="ml-2 text-xs text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Character */}
      <motion.div
        animate={getMascotAnimation()}
        className="relative"
      >
        {/* Render mascot PNG based on direction */}
        <img
          src={getMascotImage()}
          alt="Mascot"
          style={{
            width: '100%',
            height: '100%', 
            imageRendering: 'pixelated',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Mascot;