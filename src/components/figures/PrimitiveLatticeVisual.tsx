import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Grid, Target } from 'lucide-react';
import { MathComp } from '../Math';

const PrimitiveLatticeVisual: React.FC = () => {
  const [n, setN] = useState(10);

  function gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      x %= y;
      [x, y] = [y, x];
    }
    return x;
  }

  const points = useMemo(() => {
    const arr = [];
    for (let p = 1; p <= n; p++) {
      for (let q = 1; q <= n; q++) {
        const isPrimitive = gcd(p, q) === 1;
        arr.push({ p, q, isPrimitive });
      }
    }
    return arr;
  }, [n]);

  const primitiveCount = useMemo(() => points.filter(p => p.isPrimitive).length, [points]);
  const totalCount = points.length;
  const density = (primitiveCount / totalCount).toFixed(3);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Grid className="text-blue-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          The Primitive Lattice <MathComp formula="\mathcal{L}_P" />
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          RHC angles correspond to specific nodes in a discrete information space, 
          defined by the primitivity condition <MathComp formula="\gcd(p, q) = 1" />. This lattice 
          represents the quantization of information states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Lattice Area */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 p-8">
          <svg viewBox={`0 0 ${n + 1} ${n + 1}`} className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            {Array.from({ length: n + 1 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i} y1="0" x2={i} y2={n} stroke="rgba(255,255,255,0.05)" strokeWidth="0.05" />
                <line x1="0" y1={i} x2={n} y2={i} stroke="rgba(255,255,255,0.05)" strokeWidth="0.05" />
              </React.Fragment>
            ))}
            
            {/* Points */}
            {points.map((pt, i) => (
              <motion.circle
                key={i}
                cx={pt.p}
                cy={pt.q}
                r={pt.isPrimitive ? 0.2 : 0.1}
                fill={pt.isPrimitive ? '#3b82f6' : 'rgba(255,255,255,0.1)'}
                initial={false}
                animate={{ scale: pt.isPrimitive ? 1.2 : 1 }}
                whileHover={{ scale: 2, fill: '#fff' }}
              />
            ))}
            
            {/* Axis Labels */}
            <text x={n / 2} y={n + 1} fill="rgba(255,255,255,0.3)" fontSize="0.5" textAnchor="middle">p (Numerator)</text>
            <text x="-1" y={n / 2} fill="rgba(255,255,255,0.3)" fontSize="0.5" textAnchor="middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>q (Denominator)</text>
          </svg>
        </div>

        {/* Controls and Stats */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">Lattice Resolution (N)</span>
                <div className="text-4xl font-mono text-white">{n}</div>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Primitive Density</span>
                <div className="text-4xl font-mono text-blue-400">{density}</div>
              </div>
            </div>
            
            <input 
              type="range" min="5" max="30" step="1" 
              value={n} onChange={(e) => setN(parseInt(e.target.value))}
              className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Target size={18} />
              </div>
              <div>
                <h5 className="text-white font-serif italic text-lg mb-1">Discrete States</h5>
                <p className="text-sm text-slate-400">
                  The blue points represent irreducible information states. 
                  As $N \to \infty$, the density of these states approaches $6/\pi^2 \approx 0.608$.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.6: The Primitive Lattice LP. RHC angles correspond to specific nodes in a discrete information space.
      </div>
    </div>
  );
};

export default PrimitiveLatticeVisual;
