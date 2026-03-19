import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Info } from 'lucide-react';

const SETS = [
  { 
    id: 'N', 
    name: 'ℕ', 
    fullName: 'Natural Integers', 
    def: 'The set of positive integers {1, 2, 3, ...}. The starting point of all arithmetic.',
    color: 'bg-navy-500', 
    textColor: 'text-white',
    size: 120,
    examples: '1, 2, 3, 42, 108'
  },
  { 
    id: 'Z', 
    name: 'ℤ', 
    fullName: 'Integers', 
    def: 'The set of all integers {..., -2, -1, 0, 1, 2, ...}. Adds zero and negative values.',
    color: 'bg-gold-400', 
    textColor: 'text-navy-900',
    size: 240,
    examples: '-5, 0, 12, -100'
  },
  { 
    id: 'C', 
    name: 'ℂ', 
    fullName: 'Complex Numbers', 
    def: 'Numbers of the form a + bi, where a, b ∈ ℝ and i² = -1. The canvas of the RHC.',
    color: 'bg-cream-200', 
    textColor: 'text-navy-800',
    size: 380,
    examples: '3+4i, 1-i, πi, 0.5'
  }
];

export const NumberSetsHierarchy: React.FC = () => {
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [showMapping, setShowMapping] = useState(true);

  return (
    <FigureContainer
      id="fig-2-1"
      title="Figure 2.1 — The Hierarchy of Number Sets"
      caption="The relationship between ℕ (positive integers), ℤ (all integers), and ℂ (complex numbers). The RHC maps ℕ² into ℂ via Ψ(a,b)=a+ib."
      variant="light"
    >
      <div className="relative w-full h-[500px] flex items-center justify-center bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8">
        {/* Venn Diagram Container */}
        <div className="relative flex items-center justify-center w-full h-full">
          {SETS.slice().reverse().map((set, i) => (
            <motion.div
              key={set.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "circOut" }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveSet(set.id)}
              className={`absolute rounded-full flex items-center justify-center cursor-pointer shadow-lg border border-black/5 ${set.color} ${set.textColor} transition-shadow hover:shadow-xl`}
              style={{ width: set.size, height: set.size, zIndex: 10 - i }}
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl font-serif font-bold">{set.name}</span>
                {set.id === 'N' && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="w-1 h-1 rounded-full bg-white/50" />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Mapping Arrow */}
          <AnimatePresence>
            {showMapping && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#F0B800" />
                  </marker>
                </defs>
                
                {/* N^2 Grid Representation */}
                <g transform="translate(50, 350)">
                  {[0, 1, 2].map(x => [0, 1, 2].map(y => (
                    <circle key={`${x}-${y}`} cx={x * 12} cy={y * 12} r="2" fill="#1C2845" opacity="0.6" />
                  )))}
                  <text x="0" y="45" className="text-[10px] font-mono fill-navy-800">ℕ²</text>
                </g>

                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  d="M 90 380 Q 150 420 250 300"
                  fill="none"
                  stroke="#F0B800"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  markerEnd="url(#arrowhead)"
                />
                
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  x="140" y="410"
                  className="text-xs font-mono fill-gold-600 font-bold"
                >
                  Ψ: ℕ² → ℂ
                </motion.text>
              </svg>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip / Info Panel */}
        <AnimatePresence>
          {activeSet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-navy-100 shadow-2xl z-30"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${SETS.find(s => s.id === activeSet)?.color}`}>
                  <span className={`font-bold ${SETS.find(s => s.id === activeSet)?.textColor}`}>{activeSet}</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">{SETS.find(s => s.id === activeSet)?.fullName}</h4>
                  <p className="text-xs text-navy-600 mt-1 leading-relaxed">
                    {SETS.find(s => s.id === activeSet)?.def}
                  </p>
                  <div className="mt-2 pt-2 border-t border-navy-50">
                    <span className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">Examples:</span>
                    <p className="text-xs font-mono text-gold-600 mt-0.5">{SETS.find(s => s.id === activeSet)?.examples}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveSet(null)}
                className="absolute top-2 right-2 text-navy-300 hover:text-navy-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setShowMapping(!showMapping)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
              showMapping ? 'bg-gold-400 text-navy-900' : 'bg-navy-100 text-navy-400'
            }`}
          >
            {showMapping ? 'Hide Mapping' : 'Show Mapping'}
          </button>
          <div className="flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">
            <Info className="w-3 h-3" />
            Click sets to explore
          </div>
        </div>
      </div>
    </FigureContainer>
  );
};
