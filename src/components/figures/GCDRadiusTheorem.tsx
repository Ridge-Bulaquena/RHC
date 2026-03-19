import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Info, Maximize2, Minimize2, Copy } from 'lucide-react';

const gcd = (a: number, b: number): number => {
  while (b) {
    a %= b;
    [a, b] = [b, a];
  }
  return a;
};

export const GCDRadiusTheorem: React.FC = () => {
  const [a, setA] = useState(12);
  const [b, setB] = useState(9);
  const [showPrimitive, setShowPrimitive] = useState(true);

  const { d, p, q, r, pr } = useMemo(() => {
    const dVal = gcd(a, b);
    const rVal = Math.sqrt(a * a + b * b);
    const pVal = a / dVal;
    const qVal = b / dVal;
    const prVal = Math.sqrt(pVal * pVal + qVal * qVal);
    return { d: dVal, p: pVal, q: qVal, r: rVal, pr: prVal };
  }, [a, b]);

  const scale = 300 / Math.max(a, b);
  const origin = { x: 100, y: 400 };

  const copyToClipboard = () => {
    const formula = `r = ${d} × √(${p}² + ${q}²) = ${r.toFixed(2)}`;
    navigator.clipboard.writeText(formula);
  };

  return (
    <FigureContainer
      id="fig-2-4"
      title="Figure 2.4 — GCD–Radius Theorem"
      caption="Theorem 2.1 (GCD–Radius Relation): The modulus r = √(a²+b²) satisfies r = d·√(p²+q²), where d = gcd(a,b) and (p,q) is the primitive pair."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <svg className="w-full h-full max-h-[450px]" viewBox="0 0 600 500">
          <defs>
            <marker id="arrowhead-gold" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#F0B800" />
            </marker>
          </defs>

          {/* Grid Lines */}
          <g stroke="#E1E7EB" strokeWidth="0.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <line key={`v-${i}`} x1={origin.x + i * 20} y1={0} x2={origin.x + i * 20} y2={500} />
            ))}
            {Array.from({ length: 21 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={origin.y - i * 20} x2={600} y2={origin.y - i * 20} />
            ))}
          </g>

          {/* Large Triangle (a,b) */}
          <motion.path
            animate={{ d: `M ${origin.x} ${origin.y} L ${origin.x + a * scale} ${origin.y} L ${origin.x + a * scale} ${origin.y - b * scale} Z` }}
            fill="rgba(28, 40, 69, 0.1)"
            stroke="#1C2845"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Labels for Large Triangle */}
          <motion.text animate={{ x: origin.x + (a * scale) / 2, y: origin.y + 25 }} className="text-sm font-mono fill-navy-800 text-center">a = {a}</motion.text>
          <motion.text animate={{ x: origin.x + a * scale + 10, y: origin.y - (b * scale) / 2 }} className="text-sm font-mono fill-navy-800">b = {b}</motion.text>
          <motion.text animate={{ x: origin.x + (a * scale) / 3, y: origin.y - (b * scale) / 2 - 10 }} className="text-sm font-mono fill-navy-900 font-bold">r = {r.toFixed(2)}</motion.text>

          {/* Primitive Triangle (p,q) */}
          <AnimatePresence>
            {showPrimitive && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  animate={{ d: `M ${origin.x} ${origin.y} L ${origin.x + p * scale} ${origin.y} L ${origin.x + p * scale} ${origin.y - q * scale} Z` }}
                  fill="rgba(240, 184, 0, 0.2)"
                  stroke="#F0B800"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <motion.text animate={{ x: origin.x + (p * scale) / 2, y: origin.y - 10 }} className="text-[10px] font-mono fill-gold-600">p = {p}</motion.text>
                <motion.text animate={{ x: origin.x + p * scale + 5, y: origin.y - (q * scale) / 2 }} className="text-[10px] font-mono fill-gold-600">q = {q}</motion.text>
                <motion.text animate={{ x: origin.x + (p * scale) / 4, y: origin.y - (q * scale) / 4 - 5 }} className="text-[10px] font-mono fill-gold-600 font-bold">√({p}²+{q}²)</motion.text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Scaling Arrow */}
          <motion.path
            animate={{ d: `M ${origin.x + p * scale} ${origin.y - q * scale} L ${origin.x + a * scale} ${origin.y - b * scale}` }}
            fill="none"
            stroke="#F0B800"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            markerEnd="url(#arrowhead-gold)"
          />
          <motion.text
            animate={{ x: origin.x + (p + a) / 2 * scale + 10, y: origin.y - (q + b) / 2 * scale - 10 }}
            className="text-xs font-mono fill-gold-600 font-bold"
          >
            Scale d = {d}
          </motion.text>
        </svg>

        {/* Controls */}
        <div className="mt-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>Leg A</span>
              <span className="text-navy-900 font-bold">{a}</span>
            </div>
            <input 
              type="range" min="1" max="25" value={a} 
              onChange={(e) => setA(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-navy-800"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
              <span>Leg B</span>
              <span className="text-navy-900 font-bold">{b}</span>
            </div>
            <input 
              type="range" min="1" max="25" value={b} 
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-navy-800"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setShowPrimitive(!showPrimitive)}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                showPrimitive ? 'bg-gold-400 text-navy-900 shadow-lg' : 'bg-navy-800 text-white'
              }`}
            >
              {showPrimitive ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              {showPrimitive ? 'Hide Primitive' : 'Show Primitive'}
            </button>
          </div>
        </div>

        {/* Prominent Equation */}
        <div className="mt-8 bg-navy-900 text-white p-6 rounded-2xl border border-gold-400/30 shadow-2xl flex flex-col items-center gap-4 group cursor-pointer" onClick={copyToClipboard}>
          <div className="text-2xl font-mono flex items-center gap-4">
            <span className="text-gold-400">r</span>
            <span className="text-cream-400">=</span>
            <span className="text-gold-400">d</span>
            <span className="text-cream-400">×</span>
            <span className="text-gold-400">√(p² + q²)</span>
          </div>
          <div className="text-sm font-mono text-cream-400 flex items-center gap-2">
            {r.toFixed(2)} = {d} × {pr.toFixed(2)}
            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Adjust legs to see scaling
        </div>
      </div>
    </FigureContainer>
  );
};
