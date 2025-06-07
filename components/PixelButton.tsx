'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const PixelButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}: PixelButtonProps) => {
  const baseClasses = "pixel-font font-medium px-6 py-3 relative overflow-hidden transition-all duration-200";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-400 hover:bg-blue-500 text-white border-2 border-blue-600" 
    : "bg-slate-200 hover:bg-slate-300 text-slate-800 border-2 border-slate-400";

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{
        borderRadius: '0px',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
      }}
    >
      <motion.div
        whileHover={{ x: [0, 2, -2, 0] }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

export default PixelButton;