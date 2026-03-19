import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid3X3, Layers, Activity, ChevronRight, RotateCcw } from 'lucide-react';
import { MathComp } from '../Math';

const LatticeSim = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  
  function gcd(x: number, y: number): number {
    return !y ? x : gcd(y, x % y);
  }
  const d = gcd(a, b);
  const p = a / d;
  const q = b / d;
  const r = Math.sqrt(a * a + b * b);
  const theta = Math.atan2(b, a);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest opacity-60">Integer a</label>
          <input 
            type="range" min="1" max="20" value={a} 
            onChange={(e) => setA(parseInt(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="text-xl font-serif">{a}</div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest opacity-60">Integer b</label>
          <input 
            type="range" min="1" max="20" value={b} 
            onChange={(e) => setB(parseInt(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="text-xl font-serif">{b}</div>
        </div>
      </div>

      <div className="aspect-square bg-navy-900 rounded-xl relative overflow-hidden border border-white/10">
        <svg viewBox="-2 -2 24 24" className="w-full h-full">
          {/* Grid */}
          {Array.from({ length: 21 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i} y1={0} x2={i} y2={20} stroke="white" strokeWidth="0.02" opacity="0.2" />
              <line x1={0} y1={i} x2={20} y2={i} stroke="white" strokeWidth="0.02" opacity="0.2" />
            </React.Fragment>
          ))}
          
          {/* Ray */}
          <line x1={0} y1={0} x2={a} y2={b} stroke="rgba(212, 175, 55, 0.5)" strokeWidth="0.1" strokeDasharray="0.2 0.2" />
          
          {/* Points */}
          {Array.from({ length: d }).map((_, i) => (
            <circle 
              key={i} 
              cx={(i + 1) * p} cy={(i + 1) * q} r="0.2" 
              fill={i + 1 === d ? "#D4AF37" : "white"} 
              opacity={i + 1 === d ? 1 : 0.5}
            />
          ))}
          
          {/* Main Point Label */}
          <text x={a + 0.5} y={b + 0.5} fill="white" fontSize="0.8" className="font-mono">
            ({a}, {b})
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-[10px] font-mono uppercase opacity-50 mb-1">GCD (Scale)</div>
          <div className="text-gold-400 font-bold">d = {d}</div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-[10px] font-mono uppercase opacity-50 mb-1">Primitive Pair</div>
          <div className="text-gold-400 font-bold">({p}, {q})</div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-[10px] font-mono uppercase opacity-50 mb-1">Modulus</div>
          <div className="text-gold-400 font-bold">r ≈ {r.toFixed(3)}</div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-[10px] font-mono uppercase opacity-50 mb-1">Angle</div>
          <div className="text-gold-400 font-bold">θ ≈ {(theta * 180 / Math.PI).toFixed(2)}°</div>
        </div>
      </div>
    </div>
  );
};

const FoldSim = () => {
  const [real, setReal] = useState(1.5);
  const [imag, setImag] = useState(0.8);
  
  const z = { r: real, i: imag };
  const magSq = real * real + imag * imag;
  const invZ = { r: real / magSq, i: -imag / magSq };
  const fold = { r: (z.r + invZ.r) / 2, i: (z.i + invZ.i) / 2 };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest opacity-60">Real Part</label>
          <input 
            type="range" min="-2" max="2" step="0.1" value={real} 
            onChange={(e) => setReal(parseFloat(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="text-xl font-serif">{real.toFixed(1)}</div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest opacity-60">Imaginary Part</label>
          <input 
            type="range" min="-2" max="2" step="0.1" value={imag} 
            onChange={(e) => setImag(parseFloat(e.target.value))}
            className="w-full accent-gold-500"
          />
          <div className="text-xl font-serif">{imag.toFixed(1)}</div>
        </div>
      </div>

      <div className="aspect-square bg-navy-900 rounded-xl relative overflow-hidden border border-white/10">
        <svg viewBox="-3 -3 6 6" className="w-full h-full">
          {/* Axes */}
          <line x1="-3" y1="0" x2="3" y2="0" stroke="white" strokeWidth="0.01" opacity="0.3" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="white" strokeWidth="0.01" opacity="0.3" />
          
          {/* Unit Circle */}
          <circle cx="0" cy="0" r="1" fill="none" stroke="white" strokeWidth="0.01" opacity="0.2" strokeDasharray="0.1 0.1" />
          
          {/* Z */}
          <line x1="0" y1="0" x2={real} y2={-imag} stroke="white" strokeWidth="0.02" opacity="0.5" />
          <circle cx={real} cy={-imag} r="0.08" fill="white" />
          <text x={real + 0.1} y={-imag - 0.1} fill="white" fontSize="0.2" className="font-mono">z</text>
          
          {/* 1/Z */}
          <line x1="0" y1="0" x2={invZ.r} y2={-invZ.i} stroke="#D4AF37" strokeWidth="0.02" opacity="0.5" />
          <circle cx={invZ.r} cy={-invZ.i} r="0.08" fill="#D4AF37" />
          <text x={invZ.r + 0.1} y={-invZ.i - 0.1} fill="#D4AF37" fontSize="0.2" className="font-mono">1/z</text>
          
          {/* Fold(Z) */}
          <circle cx={fold.r} cy={-fold.i} r="0.1" fill="#FFD700" />
          <text x={fold.r + 0.1} y={-fold.i - 0.1} fill="#FFD700" fontSize="0.2" className="font-bold font-mono">F(z)</text>
          
          {/* Connection */}
          <line x1={real} y1={-imag} x2={invZ.r} y2={-invZ.i} stroke="white" strokeWidth="0.01" strokeDasharray="0.05 0.05" opacity="0.3" />
        </svg>
      </div>

      <div className="p-4 bg-gold-400/10 rounded-xl border border-gold-400/20">
        <MathComp formula={`\\mathcal{F}(z) = \\frac{1}{2}(z + z^{-1}) = ${fold.r.toFixed(3)} ${fold.i >= 0 ? '+' : '-'} ${Math.abs(fold.i).toFixed(3)}i`} />
      </div>
    </div>
  );
};

const HarmonicSim = () => {
  const [n, setN] = useState(5);
  
  const harmonics = useMemo(() => {
    return Array.from({ length: n }).map((_, i) => {
      const ratio = (i + 1) / n;
      const angle = Math.atan(ratio);
      return { ratio, angle };
    });
  }, [n]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest opacity-60">Base Integer (n)</label>
        <input 
          type="range" min="2" max="12" value={n} 
          onChange={(e) => setN(parseInt(e.target.value))}
          className="w-full accent-gold-500"
        />
        <div className="text-xl font-serif">{n}</div>
      </div>

      <div className="aspect-video bg-navy-900 rounded-xl relative overflow-hidden border border-white/10 flex items-center justify-center">
        <div className="flex items-end gap-1 h-32">
          {harmonics.map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h.ratio * 100}%` }}
              className="w-8 bg-gold-400 rounded-t-sm relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {i+1}/{n}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm opacity-70 italic">
          Harmonic ratios <MathComp formula="k/n" /> map to discrete angles <MathComp formula="\theta_k = \arctan(k/n)" />. These form the "overtones" of the RHC fundamental.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {harmonics.map((h, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5 text-xs font-mono">
              <span>Ratio {i+1}/{n}</span>
              <span className="text-gold-400">{(h.angle * 180 / Math.PI).toFixed(2)}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Chapter3Interactive = () => {
  const [activeTab, setActiveTab] = useState<'lattice' | 'fold' | 'harmonic'>('lattice');

  const tabs = [
    { id: 'lattice', label: 'Lattice', icon: Grid3X3, desc: 'Visualize Integer Grid' },
    { id: 'fold', label: 'Fold', icon: Layers, desc: 'Apply Fold Operator' },
    { id: 'harmonic', label: 'Harmonic', icon: Activity, desc: 'Extract Harmonics' },
  ] as const;

  return (
    <div className="my-12 bg-navy-800 rounded-3xl overflow-hidden shadow-2xl border border-gold-400/20">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 bg-navy-900/50 p-8 border-r border-white/5">
          <h4 className="text-2xl font-serif text-gold-400 mb-2">Interactive Exploration</h4>
          <p className="text-sm text-white/60 mb-8">
            Explore the relationships between discrete integers and continuous geometry.
          </p>
          
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all text-left ${
                  activeTab === tab.id 
                    ? 'bg-gold-400 text-navy-900 shadow-lg' 
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 leading-none mb-1">
                    {tab.id}
                  </div>
                  <div className="text-sm font-bold leading-none">
                    {tab.desc}
                  </div>
                </div>
                {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <button 
              onClick={() => setActiveTab('lattice')}
              className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/80 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Simulation
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 p-8 lg:p-12 bg-navy-800 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {activeTab === 'lattice' && <LatticeSim />}
              {activeTab === 'fold' && <FoldSim />}
              {activeTab === 'harmonic' && <HarmonicSim />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
