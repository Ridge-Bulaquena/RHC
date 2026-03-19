import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

interface Node {
  p: number;
  q: number;
  left: { p: number, q: number };
  right: { p: number, q: number };
  level: number;
}

export const SternBrocotViewer: React.FC = () => {
  const [maxLevel, setMaxLevel] = useState(4);

  const tree = useMemo(() => {
    const nodes: Node[] = [];
    const generate = (left: { p: number, q: number }, right: { p: number, q: number }, level: number) => {
      if (level > maxLevel) return;
      const p = left.p + right.p;
      const q = left.q + right.q;
      nodes.push({ p, q, left, right, level });
      generate(left, { p, q }, level + 1);
      generate({ p, q }, right, level + 1);
    };
    generate({ p: 0, q: 1 }, { p: 1, q: 0 }, 1);
    return nodes.sort((a, b) => (a.p / a.q) - (b.p / b.q));
  }, [maxLevel]);

  return (
    <FigureWrapper
      id="fig-7-7"
      title="7.3.3 Primitive Pairs and the Stern-Brocot Tree"
      subtitle="Enumeration of All Positive Rationals"
      caption="A visualization of the Stern-Brocot tree, which generates all positive rational numbers in their simplest form. Each node (p, q) represents a primitive pair in the RHC state space, illustrating the hierarchical structure of the state space."
      mathBasis="\frac{p_L + p_R}{q_L + q_R}. The Stern-Brocot tree provides a natural ordering of primitive pairs, intimately connected to the Euclidean algorithm and continued fractions."
    >
      <div className="w-full h-full bg-cream-50 flex flex-col p-8 overflow-auto">
        {/* Controls */}
        <div className="mb-8 w-full max-w-md mx-auto bg-white p-6 rounded-2xl border border-cream-200 shadow-sm">
          <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between mb-2">
            Tree Depth <span>{maxLevel}</span>
          </label>
          <input 
            type="range" min="1" max="6" step="1" value={maxLevel} onChange={(e) => setMaxLevel(parseInt(e.target.value))}
            className="w-full accent-gold-500"
          />
        </div>

        {/* Tree Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-[800px]">
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Levels */}
            {Array.from({ length: maxLevel }).map((_, l) => (
              <div key={l} className="flex justify-center gap-4 mb-12 w-full">
                {tree.filter(n => n.level === l + 1).map((node, i) => (
                  <motion.div
                    key={`${node.p}/${node.q}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (l * 0.1) + (i * 0.02) }}
                    className="w-16 h-16 bg-white border-2 border-gold-500 rounded-full flex flex-col items-center justify-center shadow-lg relative z-10"
                  >
                    <div className="text-xs font-bold text-navy-900">{node.p}</div>
                    <div className="w-8 h-[1px] bg-navy-200 my-1" />
                    <div className="text-xs font-bold text-navy-900">{node.q}</div>
                    
                    {/* Tooltip-like info */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-navy-400 uppercase tracking-widest">
                      {(node.p / node.q).toFixed(3)}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Background lines (simplified) */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <svg className="w-full h-full">
                {/* Lines could be drawn here for a more complete tree look */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
