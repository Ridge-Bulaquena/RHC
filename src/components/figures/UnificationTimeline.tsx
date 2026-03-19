import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';
import { FigureContainer } from '../FigureContainer';

const timelineData = [
  {
    year: '1687',
    era: 'Newton',
    title: 'Universal Gravitation',
    equation: 'F = G \\frac{m_1 m_2}{r^2}',
    description: 'Newton united terrestrial and celestial mechanics, showing that the same force governs falling apples and orbiting planets.',
    icon: '🍎',
  },
  {
    year: '1865',
    era: 'Maxwell',
    title: 'Electromagnetism',
    equation: '\\nabla \\cdot E = \\frac{\\rho}{\\varepsilon_0}, \\nabla \\times B = \\mu_0 J + \\mu_0 \\varepsilon_0 \\frac{\\partial E}{\\partial t}',
    description: 'Maxwell unified electricity, magnetism, and optics into a single electromagnetic field theory.',
    icon: '⚡',
  },
  {
    year: '1915',
    era: 'Einstein',
    title: 'Spacetime & Gravity',
    equation: 'G_{\\mu\\nu} = 8\\pi G T_{\\mu\\nu}',
    description: 'Einstein merged space and time into a four-dimensional manifold, where gravity is the curvature of spacetime.',
    icon: '🌌',
  },
  {
    year: '1967',
    era: 'Standard Model',
    title: 'Gauge Unification',
    equation: 'SU(3) \\times SU(2) \\times U(1)',
    description: 'The unification of electromagnetic, weak, and strong nuclear forces under the framework of gauge symmetry.',
    icon: '⚛️',
  },
  {
    year: '1948-1961',
    era: 'Information Age',
    title: 'Information as Physical',
    equation: 'H = -\\sum p \\log p, E \\ge kT \\ln 2',
    description: 'Shannon and Landauer established information as a fundamental physical quantity linked to thermodynamics.',
    icon: '💾',
  },
  {
    year: '1998-Present',
    era: 'Emergent Paradigms',
    title: 'Holography & ER=EPR',
    equation: 'S = \\frac{A}{4G}, ER = EPR',
    description: 'The proposal that spacetime and gravity emerge from quantum entanglement and information structure.',
    icon: '🕸️',
  },
];

export const UnificationTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <FigureContainer
      id="fig-1-1"
      title="Figure 1.1 — The Unification Timeline"
      caption="The quest for unification: from Newton's gravity to emergent spacetime paradigms. Information has emerged as a central thread connecting physics, computation, and cognition."
      variant="dark"
    >
      <div className="relative h-full flex flex-col justify-center p-4 md:p-8 overflow-hidden">
        {/* Timeline Axis */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gold-400/20 -translate-y-1/2" />
        
        <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <div key={index} className="relative group">
              <motion.button
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative z-10 w-4 h-4 rounded-full transition-all duration-500 ${
                  activeIndex === index 
                    ? 'bg-gold-400 scale-150 shadow-[0_0_15px_rgba(240,184,0,0.8)]' 
                    : 'bg-gold-600 hover:bg-gold-400'
                }`}
                whileHover={{ scale: 1.3 }}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold-400"
                    animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
              
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 text-center whitespace-nowrap transition-all duration-500 ${
                activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
              }`}>
                <span className="block text-[10px] font-mono text-gold-300">{item.year}</span>
                <span className="block text-xs font-bold text-cream-50">{item.era}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Card */}
        <div className="mt-24 h-64 relative max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-navy-900/80 border border-gold-400/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="text-4xl md:text-6xl bg-gold-400/10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border border-gold-400/20">
                {timelineData[activeIndex].icon}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h5 className="text-xl md:text-2xl font-serif text-gold-400 mb-1">
                  {timelineData[activeIndex].title}
                </h5>
                <p className="text-sm text-cream-200 mb-4 font-light leading-relaxed">
                  {timelineData[activeIndex].description}
                </p>
                <div className="inline-block bg-navy-800/50 px-4 py-2 rounded-lg border border-gold-400/10 font-mono text-gold-300 text-sm">
                  {timelineData[activeIndex].equation}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length)}
            className="p-2 rounded-full bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-gold-400 text-navy-800 flex items-center justify-center hover:bg-gold-300 transition-colors shadow-lg"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % timelineData.length)}
            className="p-2 rounded-full bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </FigureContainer>
  );
};
