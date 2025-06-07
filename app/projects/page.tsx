'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task manager with real-time updates and team features.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather app with detailed forecasts and interactive maps.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Vue.js", "D3.js", "Weather API"],
    github: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "This very website! Built with Next.js and featuring a cute mascot guide.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "#",
    demo: "#"
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
          My Projects
        </h1>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                <img
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
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mascot */}
      {showMascot && (
        <Mascot
          pose="jump"
          position="corner"
          message="This one took way too long, but it turned out quite good!"
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