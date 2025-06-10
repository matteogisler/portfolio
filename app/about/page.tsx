'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Palette, Zap, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';

const skills = [
  { name: "JavaScript", level: 90, icon: Code, color: "bg-yellow-400" },
  { name: "React/Next.js", level: 85, icon: Zap, color: "bg-blue-400" },
  { name: "TypeScript", level: 80, icon: Code, color: "bg-blue-600" },
  { name: "UI/UX Design", level: 75, icon: Palette, color: "bg-purple-400" },
  { name: "Node.js", level: 70, icon: Zap, color: "bg-green-400" },
  { name: "Problem Solving", level: 95, icon: Heart, color: "bg-red-400" }
];

export default function About() {
  const [showMascot, setShowMascot] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMascot(true), 500);
    const timer2 = setTimeout(() => setAnimateSkills(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <PixelButton 
          onClick={() => router.push('/')}
          variant="secondary"
          className="p-2"
        >
          <ArrowLeft size={20} />
        </PixelButton>
        
        <h1 className="text-4xl font-bold text-slate-800 pixel-font">
          About Me
        </h1>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Avatar */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-300"
              >
                <div className="text-6xl">👨‍💻</div>
              </motion.div>
              
              {/* Floating elements around avatar */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center"
              >
                ⚡
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-4 -left-4 w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center"
              >
                💖
              </motion.div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 pixel-font">
                Hi there! I'm Matteo 👋
              </h2>
              
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with a love for creating 
                  beautiful, functional web experiences. When I'm not coding, 
                  you'll find me exploring new technologies or playing video games.
                </p>
                
                <p>
                  I believe in writing clean, maintainable code and creating 
                  user interfaces that are both intuitive and delightful. 
                  Every project is an opportunity to learn something new!
                </p>
                
                <p>
                  My journey in tech started with curiosity and has grown into 
                  a deep passion for problem-solving through code. I love 
                  collaborating with teams and bringing ideas to life.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 pixel-font mb-6">
              My Skills
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${skill.color} text-white`}>
                      <skill.icon size={16} />
                    </div>
                    <span className="font-medium text-slate-800">{skill.name}</span>
                    <span className="text-sm text-slate-500 ml-auto">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={animateSkills ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full ${skill.color} rounded-full relative`}
                    >
                      <motion.div
                        animate={{ x: [-10, 10, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white opacity-20 w-4 rounded-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200"
            >
              <h4 className="font-bold text-slate-800 pixel-font mb-3">
                Fun Facts About Me
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>🎮 Love retro games (hence the pixel aesthetic!)</li>
                <li>☕ Coffee enthusiast - 5+ cups a day</li>
                <li>🌱 Always learning new frameworks</li>
                <li>🎵 Code better with jazz music</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mascot */}
      {showMascot && (
        <Mascot
          pose="wave"
          position="side"
          message="He's always learning new tricks—just like me!"
        />
      )}
    </div>
  );
}