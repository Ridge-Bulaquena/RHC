import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Info, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface Fraction {
  p: number;
  q: number;
  val: number;
}

export const FareySequence: React.FC = () => {
  const [order, setOrder] = useState(5);
  const [hoveredFraction, setHoveredFraction] = useState<Fraction | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      a %= b;
      [a, b] = [b, a];
    }
    return a;
  };

  const fractions = useMemo(() => {
    const res: Fraction[] = [];
    for (let q = 1; q <= order; q++) {
      for (let p = 0; p <= q; p++) {
        if (gcd(p, q) === 1) {
          res.push({ p, q, val: p / q });
        }
      }
    }
    return res.sort((a, b) => a.val - b.val);
  }, [order]);

  const width = 800;
  const height = 400;
  const margin = 50;
  const scale = width - 2 * margin;

  return (
    <FigureContainer
      id="fig-2-12"
      title="Figure 2.12 — The Farey Sequence and Ford Circles"
      caption="The Farey sequence F_n is the set of irreducible fractions between 0 and 1 with denominator ≤ n. Ford circles are tangent to the x-axis at each fraction p/q with radius 1/(2q²)."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <svg className="w-full h-full max-h-[450px]" viewBox={`0 0 ${width} ${height}`}>
          {/* Number Line */}
          <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#1C2845" strokeWidth="2" />
          
          {/* Ford Circles */}
          {fractions.map((f, i) => {
            const x = margin + f.val * scale;
            const r = (1 / (2 * f.q * f.q)) * scale;
            const y = height - margin - r;

            return (
              <motion.g
                key={`ford-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                onMouseEnter={() => setHoveredFraction(f)}
                onMouseLeave={() => setHoveredFraction(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={hoveredFraction === f ? "rgba(240, 184, 0, 0.4)" : "none"}
                  stroke={hoveredFraction === f ? "#F0B800" : "rgba(28, 40, 69, 0.2)"}
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
                <circle
                  cx={x}
                  cy={height - margin}
                  r="3"
                  fill="#1C2845"
                />
                {f.q <= 3 && (
                  <text
                    x={x}
                    y={height - margin + 20}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-navy-900 font-bold"
                  >
                    {f.p}/{f.q}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Info Panel */}
        <AnimatePresence>
          {hoveredFraction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-8 bg-white border border-navy-100 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-2"
            >
              <div className="text-2xl font-mono text-navy-900 font-bold">
                {hoveredFraction.p} / {hoveredFraction.q}
              </div>
              <div className="text-[10px] font-mono text-navy-400 uppercase tracking-widest">
                Value {hoveredFraction.val.toFixed(4)} · Radius 1/(2·{hoveredFraction.q}²)
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-6 w-full max-w-md space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
            <span>Farey Order (n)</span>
            <span className="text-navy-900 font-bold">{order}</span>
          </div>
          <input 
            type="range" min="1" max="15" step="1" value={order} 
            onChange={(e) => setOrder(parseInt(e.target.value))}
            className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
          />
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Observe how Ford circles never overlap
        </div>
      </div>
    </FigureContainer>
  );
};
