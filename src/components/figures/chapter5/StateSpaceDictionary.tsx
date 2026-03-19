import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { ChevronRight, Zap, Info, Layers, Target, Activity } from 'lucide-react';

export const StateSpaceDictionary: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const theta = Math.atan2(b, a) * (180 / Math.PI);
  const r = Math.sqrt(a * a + b * b);
  function gcd(x: number, y: number): number {
    return !y ? x : gcd(y, x % y);
  }
  const d = gcd(a, b);

  const panels = [
    {
      id: 1,
      title: 'Integer Pair (a,b)',
      rhc: `(a,b) = (${a},${b})`,
      physical: 'Binary Quantum State',
      icon: <Layers className="w-6 h-6" />,
      body: 'Integer pairs encode discrete, countable information. In this analogy, they represent the hidden quantum numbers of a binary system.',
      math: 'z = a + ib',
      examples: ['Energy levels (n, l)', 'Photon counts (n1, n2)', 'Spin components (Sz1, Sz2)']
    },
    {
      id: 2,
      title: 'Angle θ',
      rhc: `θ = ${theta.toFixed(1)}°`,
      physical: 'Continuous Parameter',
      icon: <Target className="w-6 h-6" />,
      body: 'The ratio b/a determines the continuous parameter θ. This corresponds to a coupling constant or external field parameter.',
      math: '\\theta = \\arctan(b/a)',
      examples: ['Coupling strength', 'Phase angle', 'Field parameter']
    },
    {
      id: 3,
      title: 'Modulus r / GCD d',
      rhc: `r = ${r.toFixed(2)}, d = ${d}`,
      physical: 'Latent Scale / Energy',
      icon: <Activity className="w-6 h-6" />,
      body: 'The total scale of the system. r or d represents a hidden resource, such as total energy or total particle number.',
      math: 'r = \\sqrt{a^2+b^2}',
      examples: ['Total energy', 'Total particle number', 'Scale factor']
    }
  ];

  return (
    <FigureWrapper
      id="fig-5-2"
      title="Hypothesis 1: RHC as State Space Dictionary"
      subtitle="Interactive Mapping"
      caption="Proposed correspondence between RHC objects and physical concepts. (a,b) ↔ binary state, θ ↔ continuous parameter, r/d ↔ latent scale."
      mathBasis="The state space of the RHC is the set of all Gaussian integers (a,b). Each point z = a + ib is uniquely determined by its discrete coordinates, but also by its continuous polar representation (r, θ). This duality mirrors the discrete/continuous nature of quantum systems."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-8 bg-white p-6 rounded-2xl border border-cream-200 shadow-sm">
          <div className="flex flex-col gap-2 min-w-[150px]">
            <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
              Integer a <span>{a}</span>
            </label>
            <input 
              type="range" min="1" max="20" value={a} onChange={(e) => setA(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="flex flex-col gap-2 min-w-[150px]">
            <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">
              Integer b <span>{b}</span>
            </label>
            <input 
              type="range" min="1" max="20" value={b} onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <button 
            onClick={() => { const temp = a; setA(b); setB(temp); }}
            className="px-4 py-2 bg-navy-900 text-cream-50 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-navy-800 transition-colors"
          >
            Swap a & b
          </button>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {panels.map((panel) => (
            <motion.div
              key={panel.id}
              layoutId={`panel-${panel.id}`}
              onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
              className={cn(
                "relative p-6 bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden",
                activePanel === panel.id ? "border-gold-400 shadow-xl z-20" : "border-cream-200 hover:border-gold-300 hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gold-400/10 text-gold-600 rounded-lg">
                  {panel.icon}
                </div>
                <h4 className="text-lg font-serif text-navy-900 leading-tight">{panel.title}</h4>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-cream-50 rounded-xl border border-cream-100">
                  <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">RHC Object</div>
                  <div className="text-lg font-bold text-navy-900">{panel.rhc}</div>
                  <div className="mt-1"><MathComp formula={panel.math} /></div>
                </div>

                <div className="p-3 bg-navy-900 rounded-xl">
                  <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1">Physical Analogue</div>
                  <div className="text-lg font-bold text-cream-50">{panel.physical}</div>
                </div>
              </div>

              <AnimatePresence>
                {activePanel === panel.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-cream-100"
                  >
                    <p className="text-sm text-navy-700 leading-relaxed mb-4">{panel.body}</p>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Examples</div>
                      <div className="flex flex-wrap gap-2">
                        {panel.examples.map((ex, i) => (
                          <span key={i} className="px-2 py-1 bg-cream-100 text-navy-600 text-[10px] rounded-md font-medium">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Background Icon */}
              <div className="absolute -bottom-4 -right-4 opacity-5 text-navy-900 pointer-events-none scale-[5] origin-bottom-right">
                {panel.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Info className="w-3 h-3" />
            Click any panel to explore detailed physical correspondences
          </p>
        </div>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
