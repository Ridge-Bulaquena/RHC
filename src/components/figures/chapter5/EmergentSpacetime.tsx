import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Layers, Zap, Info, ChevronRight, RefreshCw, Box } from 'lucide-react';

export const EmergentSpacetime: React.FC = () => {
  const [complexity, setComplexity] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate a "grid" of RHC states (a,b)
  const grid = useMemo(() => {
    const items = [];
    for (let a = 1; a <= complexity; a++) {
      for (let b = 1; b <= complexity; b++) {
        const theta = Math.atan(b/a);
        const fold = Math.cos(theta);
        items.push({ a, b, theta, fold, id: `${a}-${b}` });
      }
    }
    return items;
  }, [complexity]);

  return (
    <FigureWrapper
      id="fig-5-9"
      title="Hypothesis 3: Emergent Spacetime"
      subtitle="From RHC Grid to Metric"
      caption="A discrete grid of RHC states (a,b) defines a local metric. As the density of states increases, a smooth spacetime manifold emerges from the underlying arithmetic structure."
      mathBasis="The Fisher metric g_{ij} = \partial_i \theta \partial_j \theta provides the distance between states. In the limit of large a,b, the discrete grid approximates a continuous manifold with metric g = d\theta^2."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">State Lattice</div>
            
            <div 
              className="grid gap-2"
              style={{ 
                gridTemplateColumns: `repeat(${complexity}, 1fr)`,
                width: 'min(400px, 100%)',
                aspectRatio: '1/1'
              }}
            >
              {grid.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="relative group"
                >
                  <div 
                    className="w-full h-full rounded-lg border border-cream-200 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:z-10 cursor-pointer shadow-sm"
                    style={{ 
                      backgroundColor: `rgba(240, 184, 0, ${item.fold * 0.8})`,
                      borderColor: `rgba(11, 17, 32, ${0.1 + (1 - item.fold) * 0.4})`
                    }}
                  >
                    <div className="text-[8px] font-bold text-navy-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      ({item.a},{item.b})
                    </div>
                  </div>

                  {/* Connection lines to neighbors */}
                  {item.a < complexity && (
                    <div className="absolute top-1/2 -right-2 w-2 h-[1px] bg-cream-300 z-0" />
                  )}
                  {item.b < complexity && (
                    <div className="absolute -bottom-2 left-1/2 w-[1px] h-2 bg-cream-300 z-0" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Emergent Metric Overlay */}
            <AnimatePresence>
              {complexity > 5 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gold-400/20 to-navy-900/20 mix-blend-overlay"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Controls Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
                Lattice Density <span>{complexity}x{complexity}</span>
              </label>
              <input 
                type="range" min="2" max="10" step="1" value={complexity} onChange={(e) => setComplexity(parseInt(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>

            <div className="p-6 bg-white border border-cream-200 rounded-2xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Metric Emergence</div>
                  <div className="text-sm font-serif text-navy-900">
                    {complexity < 5 ? "Discrete State Lattice" : complexity < 8 ? "Approximating Manifold" : "Smooth Spacetime Limit"}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-cream-100" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Total States</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{complexity * complexity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Avg. Metric g</span>
                  <span className="text-lg font-bold font-mono text-navy-900">{(1/complexity).toFixed(3)}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-navy-900 rounded-2xl p-6 text-gold-400 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Box className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2">Hypothesis 3 Insight</div>
                <p className="text-xs leading-relaxed opacity-80 italic">
                  "Spacetime is not a container, but the collective geometry of information exchange between discrete RHC states."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
