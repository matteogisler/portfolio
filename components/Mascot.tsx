'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type MascotPose = 'idle' | 'walk' | 'jump' | 'speak' | 'wave';
type MascotPosition = 'center' | 'corner' | 'side';

interface MascotProps {
  pose?: MascotPose;
  message?: string;
  position?: MascotPosition;
  onMessageComplete?: () => void;
}

const Mascot = ({ 
  pose = 'idle', 
  message, 
  position = 'center',
  onMessageComplete 
}: MascotProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPose, setCurrentPose] = useState<MascotPose>(pose);

  useEffect(() => {
    if (message) {
      setCurrentPose('speak');
      setShowMessage(true);
    } else {
      setCurrentPose(pose);
      setShowMessage(false);
    }
  }, [message, pose]);

  const getPositionClasses = () => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'corner':
        return 'bottom-8 right-8';
      case 'side':
        return 'top-1/2 left-8 transform -translate-y-1/2';
      default:
        return 'bottom-8 right-8';
    }
  };

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

  return (
    <motion.div
      className={`fixed z-50 ${getPositionClasses()}`}
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
            className="speech-bubble pixel-font text-sm mb-4 max-w-xs"
          >
            {message}
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
        {/* Simple SVG Mascot */}
        <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
          {/* Shadow */}
          <ellipse cx="40" cy="75" rx="25" ry="5" fill="rgba(0,0,0,0.1)" />
          
          {/* Body */}
          <circle cx="40" cy="45" r="20" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2" />
          
          {/* Head */}
          <circle cx="40" cy="25" r="15" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
          
          {/* Eyes */}
          <circle cx="35" cy="22" r="3" fill="#1E40AF" />
          <circle cx="45" cy="22" r="3" fill="#1E40AF" />
          <circle cx="36" cy="21" r="1" fill="white" />
          <circle cx="46" cy="21" r="1" fill="white" />
          
          {/* Cheeks */}
          <circle cx="28" cy="28" r="3" fill="#FCA5A5" opacity="0.6" />
          <circle cx="52" cy="28" r="3" fill="#FCA5A5" opacity="0.6" />
          
          {/* Mouth */}
          {currentPose === 'speak' ? (
            <ellipse cx="40\" cy="30\" rx="3\" ry="2\" fill="#1E40AF" />
          ) : (
            <path d="M 37 30 Q 40 33 43 30\" stroke="#1E40AF\" strokeWidth="2\" fill="none" />
          )}
          
          {/* Arms */}
          <circle cx="25" cy="40" r="6" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="55" cy="40" r="6" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2" />
          
          {/* Wave effect for wave pose */}
          {currentPose === 'wave' && (
            <motion.g
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
              style={{ transformOrigin: "55px 40px" }}
            >
              <circle cx="55" cy="40" r="6" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2" />
            </motion.g>
          )}
          
          {/* Feet */}
          <ellipse cx="32" cy="62" rx="6" ry="4" fill="#1E40AF" />
          <ellipse cx="48" cy="62" rx="6" ry="4" fill="#1E40AF" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Mascot;