import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { RefreshCw, Zap, Info, ChevronRight } from 'lucide-react';

export const ExchangeSymmetry: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [isSwapped, setIsSwapped] = useState(false);

  const theta = Math.atan2(b, a);
  const foldValue = Math.cos(theta);

  const swap = () => {
    setIsSwapped(!isSwapped);
    const temp = a;
    setA(b);
    setB(temp);
  };

  return (
    <FigureWrapper
      id="fig-5-6"
      title="Hypothesis 2: Exchange Symmetry"
      subtitle="ℱ(x) = ℱ(1/x)"
      caption="The symmetry ℱ(x)=ℱ(1/x) corresponds to exchange duality: swapping a and b yields the same measurement outcome."
      mathBasis="The fold operator ℱ(x) = ½(x + 1/x) is invariant under the transformation x ↔ 1/x. In the RHC, if x = (a+ib)/(a-ib), then swapping a and b corresponds to x ↔ 1/x, which leaves the fold value unchanged."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Left Circle: (a,b) */}
          <div className="flex-1 bg-white border border-cream-200 rounded-2xl p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">State (a,b)</div>
            <svg viewBox="-50 -50 100 100" className="w-full h-full max-w-[200px]">
              <circle cx="0" cy="0" r="40" fill="none" stroke="#F0B800" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
              <line x1="0" y1="0" x2={40 * Math.cos(theta)} y2={-40 * Math.sin(theta)} stroke="#0B1120" strokeWidth="1" />
              <motion.circle
                key={`${a}-${b}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                cx={40 * Math.cos(theta)}
                cy={-40 * Math.sin(theta)}
                r="3"
                fill="#F0B800"
              />
              <text x="5" y="-45" fill="#0B1120" fontSize="5" fontWeight="bold">({a},{b})</text>
            </svg>
            <div className="mt-4 text-center">
              <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Fold Value</div>
              <div className="text-2xl font-bold text-navy-900">{foldValue.toFixed(4)}</div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={swap}
              className="p-4 bg-navy-900 text-gold-400 rounded-full shadow-xl z-10"
            >
              <RefreshCw className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Right Circle: (b,a) */}
          <div className="flex-1 bg-white border border-cream-200 rounded-2xl p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">State (b,a)</div>
            <svg viewBox="-50 -50 100 100" className="w-full h-full max-w-[200px]">
              <circle cx="0" cy="0" r="40" fill="none" stroke="#F0B800" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
              <line x1="0" y1="0" x2={40 * Math.sin(theta)} y2={-40 * Math.cos(theta)} stroke="#0B1120" strokeWidth="1" />
              <motion.circle
                key={`${b}-${a}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                cx={40 * Math.sin(theta)}
                cy={-40 * Math.cos(theta)}
                r="3"
                fill="#F0B800"
              />
              <text x="5" y="-45" fill="#0B1120" fontSize="5" fontWeight="bold">({b},{a})</text>
            </svg>
            <div className="mt-4 text-center">
              <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Fold Value</div>
              <div className="text-2xl font-bold text-navy-900">{foldValue.toFixed(4)}</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white border border-cream-200 rounded-xl max-w-md text-center">
            <p className="text-sm text-navy-700 leading-relaxed">
              Swapping <MathComp formula="a" /> and <MathComp formula="b" /> reflects the point across the <MathComp formula="y=x" /> line. 
              The fold operator extracts the real part of the complex ratio, which is invariant under this exchange.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">a</label>
              <input type="number" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="w-16 p-2 border border-cream-200 rounded-md text-center" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">b</label>
              <input type="number" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="w-16 p-2 border border-cream-200 rounded-md text-center" />
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
