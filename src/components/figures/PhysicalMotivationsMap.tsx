import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';

const nodes = [
  { id: 'shannon', label: 'Shannon (1948)', title: 'Information Entropy', description: 'Mathematical theory of communication.', icon: '📊', year: 1948 },
  { id: 'landauer', label: 'Landauer (1961)', title: 'Landauer Principle', description: 'Erasing a bit dissipates heat.', icon: '🔥', year: 1961 },
  { id: 'bekenstein', label: 'Bekenstein-Hawking (1973)', title: 'Black Hole Entropy', description: 'Entropy proportional to surface area.', icon: '🕳️', year: 1973 },
  { id: 'hooft', label: "t Hooft/Susskind (1993)", title: 'Holographic Principle', description: 'Bulk encoded on boundary.', icon: '🖼️', year: 1993 },
  { id: 'maldacena', label: 'Maldacena (1998)', title: 'AdS/CFT Duality', description: 'Gravity as gauge theory.', icon: '🎭', year: 1998 },
  { id: 'ryu', label: 'Ryu-Takayanagi (2006)', title: 'Entanglement Area', description: 'Entropy as minimal surface.', icon: '📐', year: 2006 },
  { id: 'er-epr', label: 'ER=EPR (2013)', title: 'Entanglement = Wormholes', description: 'Quantum information as geometry.', icon: '🌀', year: 2013 },
  { id: 'wheeler', label: 'Wheeler (1990)', title: 'It from Bit', description: 'Every entity derives from information.', icon: '💎', year: 1990 },
];

export const PhysicalMotivationsMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<typeof nodes[0] | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <FigureContainer
      id="fig-1-6"
      title="Figure 1.6 — Physical Motivations: From Shannon to ER=EPR"
      caption="The evolution of information as a physical concept. From Shannon's entropy to the holographic principle and ER=EPR, information increasingly appears fundamental."
      variant="dark"
    >
      <div className="relative h-full flex items-center justify-center p-8 overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-400 rounded-full"
              animate={{
                x: [Math.random() * 800, Math.random() * 800],
                y: [Math.random() * 500, Math.random() * 500],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Central Node */}
        <motion.div 
          className="relative z-10 w-32 h-32 rounded-full bg-gold-400 text-navy-800 flex items-center justify-center text-center p-4 font-bold text-sm shadow-[0_0_30px_rgba(240,184,0,0.5)] border-4 border-gold-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Information as Fundamental
        </motion.div>

        {/* Surrounding Nodes */}
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <React.Fragment key={node.id}>
              {/* Connection Line */}
              <motion.div
                className="absolute w-0.5 bg-gold-400/20 origin-left"
                style={{
                  left: '50%',
                  top: '50%',
                  width: radius,
                  transform: `rotate(${angle}rad)`,
                }}
              />
              
              {/* Node */}
              <motion.button
                onClick={() => setSelectedNode(node)}
                className={`absolute z-20 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 border-2 ${
                  selectedNode?.id === node.id 
                    ? 'bg-gold-400 border-gold-600 scale-125 shadow-lg' 
                    : 'bg-navy-900 border-gold-400/30 hover:border-gold-400'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                whileHover={{ scale: 1.2 }}
              >
                {node.icon}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-gold-400 uppercase tracking-widest opacity-60">
                  {node.label}
                </div>
              </motion.button>
            </React.Fragment>
          );
        })}

        {/* Detail Card */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-64 bg-navy-900/90 border border-gold-400/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl z-30"
            >
              <button 
                onClick={() => setSelectedNode(null)}
                className="absolute top-2 right-2 text-gold-400 hover:text-gold-300"
              >
                ×
              </button>
              <div className="text-3xl mb-4">{selectedNode.icon}</div>
              <h5 className="text-lg font-serif text-gold-400 mb-1">{selectedNode.title}</h5>
              <p className="text-[10px] font-mono text-gold-600 uppercase mb-3">{selectedNode.label}</p>
              <p className="text-xs text-cream-200 font-light leading-relaxed">
                {selectedNode.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FigureContainer>
  );
};
