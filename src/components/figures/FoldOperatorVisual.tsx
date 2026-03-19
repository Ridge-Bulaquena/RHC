import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, RefreshCw } from 'lucide-react';

const FoldOperatorVisual: React.FC = () => {
  const [isFolded, setIsFolded] = useState(false);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Layers className="text-purple-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The Fold Operator $\Phi$
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Visualizing the folding of the probability space. The fold operator $\Phi$ 
          projects the manifold onto itself, revealing the overlap between distributions 
          quantified by the Bhattacharyya coefficient $\rho$.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Base Circle (Unfolded) */}
          <motion.div
            className="absolute w-full h-full border-2 border-white/10 rounded-full"
            animate={{ opacity: isFolded ? 0.3 : 1 }}
          />
          
          {/* Folded Half */}
          <motion.div
            className="absolute w-full h-full bg-purple-500/20 border-2 border-purple-500 rounded-full"
            initial={false}
            animate={{ 
              rotateY: isFolded ? 180 : 0,
              x: isFolded ? 0 : 0,
              opacity: isFolded ? 0.8 : 0.5,
              scale: isFolded ? 1 : 1
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            style={{ transformOrigin: 'center' }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-purple-200 font-mono text-xs uppercase tracking-widest">
              {isFolded ? 'Folded' : 'Region A'}
            </div>
          </motion.div>

          {/* Static Half */}
          <motion.div
            className="absolute w-full h-full bg-blue-500/20 border-2 border-blue-500 rounded-full"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            animate={{ opacity: isFolded ? 0.8 : 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-blue-200 font-mono text-xs uppercase tracking-widest pr-32">
              Region B
            </div>
          </motion.div>

          {/* Overlap Indicator */}
          <AnimatePresence>
            {isFolded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-1">Overlap ρ</span>
                  <div className="text-2xl font-mono text-white">0.866</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsFolded(!isFolded)}
          className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-all shadow-lg shadow-purple-900/20 group"
        >
          <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isFolded ? 'rotate-180' : ''}`} />
          <span className="font-mono uppercase tracking-widest text-sm">
            {isFolded ? 'Unfold Manifold' : 'Apply Fold Operator'}
          </span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.4: The Fold Operator Φ. Folding the manifold reveals the overlap between distributions, quantified by the Bhattacharyya coefficient ρ.
      </div>
    </div>
  );
};

export default FoldOperatorVisual;
