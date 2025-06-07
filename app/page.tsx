'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';

export default function Home() {
  const [stage, setStage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial sequence
    const timer1 = setTimeout(() => setStage(1), 1000); // Mascot walks in
    const timer2 = setTimeout(() => setStage(2), 2500); // Speech bubble appears
    const timer3 = setTimeout(() => setShowButtons(true), 4000); // Buttons appear

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Grass Pattern Background */}
      <div className="absolute inset-0 grass-pattern" />
      
      {/* Floating Platform */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-64 h-16 bg-green-300 rounded-full opacity-50 shadow-lg" />
        <div className="absolute top-2 left-4 right-4 h-8 bg-green-400 rounded-full opacity-60" />
        
        {/* Grass Details */}
        <div className="absolute -top-2 left-8 w-2 h-6 bg-green-500 rounded-full transform rotate-12" />
        <div className="absolute -top-1 left-16 w-1 h-4 bg-green-600 rounded-full transform -rotate-6" />
        <div className="absolute -top-2 right-12 w-2 h-5 bg-green-500 rounded-full transform rotate-45" />
        <div className="absolute -top-1 right-20 w-1 h-3 bg-green-600 rounded-full transform -rotate-12" />
      </motion.div>

      {/* Mascot */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <Mascot 
              pose={stage === 1 ? 'walk' : 'speak'}
              position="center"
              message={stage >= 2 ? "Hello, my name is Matteo. Please select what you are looking for." : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex gap-6 flex-wrap justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <PixelButton onClick={() => handleNavigation('/projects')}>
                  Projects
                </PixelButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <PixelButton onClick={() => handleNavigation('/about')} variant="secondary">
                  About
                </PixelButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <PixelButton onClick={() => handleNavigation('/contact')}>
                  Contact
                </PixelButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-4 h-4 bg-yellow-300 rounded-full opacity-60"
      />
      
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          x: [0, -8, 0] 
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-32 right-32 w-6 h-6 bg-pink-300 rounded-full opacity-60"
      />
      
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          x: [0, 3, 0] 
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-40 left-40 w-5 h-5 bg-purple-300 rounded-full opacity-60"
      />
    </div>
  );
}