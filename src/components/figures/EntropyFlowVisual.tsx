import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Wind, TrendingUp } from 'lucide-react';

const EntropyFlowVisual: React.FC = () => {
  const gridSize = 10;
  const arrows = useMemo(() => {
    const arr = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i / (gridSize - 1)) * 100;
        const y = (j / (gridSize - 1)) * 100;
        // Flow toward the center (pi/2, pi/2)
        const dx = 50 - x;
        const dy = 50 - y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        arr.push({ x, y, angle, magnitude });
      }
    }
    return arr;
  }, []);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Wind className="text-blue-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          Entropy Gradients and Information Flow
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Visualizing the gradient of entropy across the manifold. 
          Information flows along geodesics toward states of higher entropy, 
          governed by the geometry of the RHC manifold.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Vector Field Area */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 p-8">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Entropy Background Gradient */}
            <defs>
              <radialGradient id="entropyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(#entropyGradient)" />
            
            {/* Arrows */}
            {arrows.map((arrow, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.002 }}
                style={{ transform: `translate(${arrow.x}px, ${arrow.y}px) rotate(${arrow.angle}deg)` }}
              >
                <motion.line
                  x1="-2" y1="0" x2="2" y2="0"
                  stroke={arrow.magnitude < 10 ? '#fff' : 'rgba(59, 130, 246, 0.5)'}
                  strokeWidth="0.5"
                  animate={{ x2: [2, 4, 2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                />
                <motion.path
                  d="M 1 -1 L 3 0 L 1 1"
                  fill="none"
                  stroke={arrow.magnitude < 10 ? '#fff' : 'rgba(59, 130, 246, 0.5)'}
                  strokeWidth="0.5"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Legend and Analysis */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-4">Entropy Level (S)</h4>
            <div className="h-4 w-full bg-gradient-to-r from-navy-900 to-blue-500 rounded-full mb-2" />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Low Entropy</span>
              <span>Maximum Entropy</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <h5 className="text-white font-serif italic text-lg mb-1">Geodesic Flow</h5>
                <p className="text-sm text-slate-400">
                  The flow lines represent the path of least resistance for information 
                  as it evolves toward a state of maximum uncertainty (uniform distribution).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.7: Entropy Gradients. Information flows along geodesics toward states of higher entropy.
      </div>
    </div>
  );
};

export default EntropyFlowVisual;
