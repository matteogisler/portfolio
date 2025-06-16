'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import nutro from "../assets/Nutro.png";
import optitrade from "../assets/optitrade.png";
import blockchain from "../assets/smart-contract.jpg";
import portfolio from "../assets/portfolio.png";
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "AI Calorie Tracker",
    description: "A calorie tracking application that uses the OpenAI API for advanced food recognition. Users can scan meals with their camera for instant nutritional information and personalized recommendations. This was built in under 24 hours for a hackathon in which me and my friend won second place🏆",
    image: nutro,
    technologies: ["Flutter", "OpenAI", "Firebase", "iOS"],
  },
  {
    id: 2,
    title: "DeFi Trading Dashboard",
    description: "A clean, modern mock DeFi trading platform built in Next.js and TypeScript with Tailwind CSS. It pulls real-time crypto market data from a third-party API, displays interactive price charts, and features a mock order panel for a polished UX-focused demo.",
    image: optitrade,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "API"],
    github: "https://github.com/matteogisler/optitrade",
    demo: "https://optitrade.vercel.app"
  },
  {
    id: 3,
    title: "CipherShare",
    description: "A decentralized, encrypted file-sharing application using IPFS for storage, PostgreSQL via Prisma for metadata, and an on-chain ACL smart contract deployed on a local Hardhat network.",
    image: blockchain,
    technologies: ["IPFS", "Blockchain", "Filesharing"],
    github: "https://github.com/matteogisler/CipherShare",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "This very website! Built with Next.js and featuring a cute mascot guide.",
    image: portfolio,
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/matteogisler/portfolio",
    demo: "https://matteogisler.com",
  }
];

export default function Projects() {
  const [showMascot, setShowMascot] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowMascot(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="flex flex-col min-h-screen p-8 overflow-y-auto">
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
          My Projects
        </h1>
      </motion.div>

      {/* Projects Grid */}
      <div className="px-4 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: "8px 8px 0px rgba(100, 116, 139, 0.3)"
              }}
              className="bg-white rounded-lg overflow-hidden border-2 border-slate-300 cursor-pointer transition-all duration-300"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative overflow-hidden">
                <Image  
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-400 opacity-0 hover:opacity-10 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 pixel-font">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs pixel-font"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {/* Only show Code link if 'github' exists */}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                  )}
                  {/* Only show Demo link if 'demo' exists */}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mascot */}
      {showMascot && (
        <Mascot
          pose="idle"
          message="Check out my work! From AI to Blockchain, there's a lot to explore."
          direction="front"
          xPct={5}
          yPct={55}
        />
      )}

      {/* Project Modal Effect */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full pixel-border"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 pixel-font">Project Details</h3>
            <p className="text-slate-600 mb-6">
              Click the links in the project card to explore the code and live demo!
            </p>
            <PixelButton onClick={() => setSelectedProject(null)}>
              Got it!
            </PixelButton>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}