import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';

const domains = [
  {
    id: 'number-theory',
    title: 'Number Theory',
    description: 'The discrete realm of integers, prime distributions, and modular arithmetic. Historically isolated from physical dynamics.',
    color: 'bg-gold-400',
    borderColor: 'border-gold-500',
    textColor: 'text-gold-900',
    position: { x: -60, y: -40 },
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'The continuous realm of manifolds, metrics, and curvature. The language of General Relativity and classical fields.',
    color: 'bg-navy-600',
    borderColor: 'border-navy-700',
    textColor: 'text-navy-50',
    position: { x: 60, y: -40 },
  },
  {
    id: 'information',
    title: 'Information',
    description: 'The statistical realm of entropy, distinguishability, and Fisher metrics. The bridge between microstates and macro-observables.',
    color: 'bg-emerald-600',
    borderColor: 'border-emerald-700',
    textColor: 'text-emerald-50',
    position: { x: 0, y: 60 },
  },
];

const intersections = [
  {
    id: 'nt-geo',
    title: 'Arithmetic Geometry',
    description: 'Elliptic curves, L-functions, and the Langlands program. Deep but often lacks physical grounding.',
    position: { x: 0, y: -40 },
  },
  {
    id: 'geo-info',
    title: 'Information Geometry',
    description: 'Fisher-Rao metrics on statistical manifolds. Powerful but lacks a discrete arithmetic origin.',
    position: { x: 30, y: 10 },
  },
  {
    id: 'nt-info',
    title: 'Algorithmic Information',
    description: 'Kolmogorov complexity and entropy of sequences. Discrete but lacks geometric embedding.',
    position: { x: -30, y: 10 },
  },
  {
    id: 'rhc',
    title: 'RHC UNIFICATION',
    description: 'The Recursive Harmonic Codex: A discrete arithmetic foundation for information-geometric spacetime.',
    position: { x: 0, y: 0 },
    isCore: true,
  },
];

export const DomainsGap: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <FigureContainer
      id="fig-1-8"
      title="Figure 1.8 — Problem Statement: The Three Domains Gap"
      caption="The conceptual gap between Number Theory, Geometry, and Information Theory. The RHC aims to occupy the central intersection."
      variant="dark"
    >
      <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #F0B800 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Venn Circles */}
        <div className="relative w-full h-full flex items-center justify-center">
          {domains.map((domain) => (
            <motion.div
              key={domain.id}
              className={`absolute w-64 h-64 rounded-full border-2 ${domain.borderColor} ${domain.color} opacity-30 cursor-pointer flex items-center justify-center`}
              style={{ x: domain.position.x, y: domain.position.y }}
              whileHover={{ scale: 1.05, opacity: 0.5 }}
              onHoverStart={() => setHoveredId(domain.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <span className={`font-serif font-bold text-lg ${domain.textColor} select-none`}>
                {domain.title}
              </span>
            </motion.div>
          ))}

          {/* Intersections (Invisible triggers) */}
          {intersections.map((inter) => (
            <motion.div
              key={inter.id}
              className={`absolute ${inter.isCore ? 'w-24 h-24' : 'w-16 h-16'} rounded-full cursor-pointer z-10 flex items-center justify-center`}
              style={{ x: inter.position.x, y: inter.position.y }}
              onHoverStart={() => setHoveredId(inter.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {inter.isCore && (
                <motion.div 
                  className="w-full h-full rounded-full bg-gold-400 shadow-[0_0_30px_rgba(240,184,0,0.5)] flex items-center justify-center p-2 text-center"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-[10px] font-mono font-bold text-navy-900 leading-tight">RHC</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-8 left-8 right-8 bg-navy-900/80 backdrop-blur-md border border-gold-400/30 p-6 rounded-xl min-h-[120px]">
          <AnimatePresence mode="wait">
            {hoveredId ? (
              <motion.div
                key={hoveredId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-2"
              >
                <h4 className="font-serif font-bold text-gold-400 text-lg">
                  {[...domains, ...intersections].find(d => d.id === hoveredId)?.title}
                </h4>
                <p className="text-sm text-cream-50/80 leading-relaxed max-w-2xl">
                  {[...domains, ...intersections].find(d => d.id === hoveredId)?.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-2 items-center justify-center h-full text-center"
              >
                <p className="text-sm text-gold-400/60 font-mono uppercase tracking-widest">
                  Hover over domains or intersections to explore the conceptual landscape
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FigureContainer>
  );
};
