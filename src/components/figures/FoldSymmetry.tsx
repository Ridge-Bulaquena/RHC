import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Info, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

export const FoldSymmetry: React.FC = () => {
  const [mode, setMode] = useState<'real' | 'complex'>('real');
  const [xVal, setXVal] = useState(2);
  const [complexX, setComplexX] = useState({ re: 1.5, im: 1.0 });

  const realData = useMemo(() => {
    const data = [];
    for (let x = 0.1; x <= 5; x += 0.1) {
      data.push({ x, f: 0.5 * (x + 1 / x) });
    }
    return data;
  }, []);

  const { fx, invX, fComplex } = useMemo(() => {
    const invX = mode === 'real' ? 1 / xVal : { 
      re: complexX.re / (complexX.re**2 + complexX.im**2),
      im: -complexX.im / (complexX.re**2 + complexX.im**2)
    };
    const f = mode === 'real' ? 0.5 * (xVal + 1 / xVal) : {
      re: 0.5 * (complexX.re + (invX as any).re),
      im: 0.5 * (complexX.im + (invX as any).im)
    };
    return { fx: f, invX, fComplex: f };
  }, [xVal, complexX, mode]);

  const origin = { x: 150, y: 150 };
  const scale = 50;

  return (
    <FigureContainer
      id="fig-2-7"
      title="Figure 2.7 — Symmetry of the Fold Operator"
      caption="The fold operator is symmetric: F(x) = F(1/x). For positive real x, it attains minimum 1 at x=1."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col md:flex-row gap-8">
        {/* Left Panel: Complex Plane or Real Mode Visualization */}
        <div className="flex-1 bg-white rounded-2xl border border-navy-100 shadow-sm p-6 flex flex-col items-center justify-center relative">
          <h4 className="absolute top-4 left-6 text-[10px] font-mono text-navy-400 uppercase tracking-widest">Complex Plane View</h4>
          
          <svg className="w-full h-full max-h-[300px]" viewBox="0 0 300 300">
            <g stroke="#E1E7EB" strokeWidth="0.5">
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 30} y1={0} x2={i * 30} y2={300} />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`h-${i}`} x1={0} y1={i * 30} x2={300} y2={i * 30} />
              ))}
            </g>
            <line x1={0} y1={origin.y} x2={300} y2={origin.y} stroke="#1C2845" strokeWidth="1" opacity="0.3" />
            <line x1={origin.x} y1={0} x2={origin.x} y2={300} stroke="#1C2845" strokeWidth="1" opacity="0.3" />

            {/* Points */}
            {mode === 'real' ? (
              <>
                <motion.circle animate={{ cx: origin.x + xVal * scale, cy: origin.y }} r="6" fill="#F0B800" />
                <motion.circle animate={{ cx: origin.x + (1/xVal) * scale, cy: origin.y }} r="4" fill="#1C2845" />
                <motion.circle animate={{ cx: origin.x + (fx as number) * scale, cy: origin.y }} r="5" fill="#F0B800" stroke="#1C2845" strokeWidth="1" />
              </>
            ) : (
              <>
                <motion.circle animate={{ cx: origin.x + complexX.re * scale, cy: origin.y - complexX.im * scale }} r="6" fill="#F0B800" />
                <motion.circle animate={{ cx: origin.x + (invX as any).re * scale, cy: origin.y - (invX as any).im * scale }} r="4" fill="#1C2845" />
                <motion.circle animate={{ cx: origin.x + (fComplex as any).re * scale, cy: origin.y - (fComplex as any).im * scale }} r="5" fill="#F0B800" stroke="#1C2845" strokeWidth="1" />
              </>
            )}
          </svg>

          <div className="mt-4 flex gap-4 text-[10px] font-mono">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gold-400" /> x</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-navy-800" /> 1/x</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gold-400 border border-navy-800" /> F(x)</div>
          </div>
        </div>

        {/* Right Panel: Plot */}
        <div className="flex-1 bg-white rounded-2xl border border-navy-100 shadow-sm p-6 flex flex-col">
          <h4 className="text-[10px] font-mono text-navy-400 uppercase tracking-widest mb-4">Real Domain: F(x) = 1/2(x + 1/x)</h4>
          
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="x" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  itemStyle={{ fontSize: '10px', fontFamily: 'Roboto Mono' }}
                />
                <ReferenceLine x={1} stroke="#F0B800" strokeDasharray="3 3" label={{ value: 'Min', position: 'top', fontSize: 10, fill: '#F0B800' }} />
                <Line type="monotone" dataKey="f" stroke="#1C2845" strokeWidth={2} dot={false} />
                {mode === 'real' && (
                  <ReferenceLine x={xVal} stroke="#F0B800" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-4 bg-navy-50 rounded-xl space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-navy-400">F(x)</span>
              <span className="text-navy-900 font-bold">{mode === 'real' ? (fx as number).toFixed(3) : (fComplex as any).re.toFixed(3) + ' + ' + (fComplex as any).im.toFixed(3) + 'i'}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-navy-400">F(1/x)</span>
              <span className="text-navy-900 font-bold">{mode === 'real' ? (fx as number).toFixed(3) : (fComplex as any).re.toFixed(3) + ' + ' + (fComplex as any).im.toFixed(3) + 'i'}</span>
            </div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <button
            onClick={() => setMode(mode === 'real' ? 'complex' : 'real')}
            className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-navy-800 text-white hover:bg-navy-700 transition-all shadow-lg"
          >
            Switch to {mode === 'real' ? 'Complex' : 'Real'}
          </button>
          
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-navy-100 shadow-xl w-48">
            {mode === 'real' ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-navy-400">
                  <span>Value x</span>
                  <span className="text-gold-600 font-bold">{xVal.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.2" max="5" step="0.1" value={xVal} 
                  onChange={(e) => setXVal(parseFloat(e.target.value))}
                  className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-navy-400">
                    <span>Re(x)</span>
                    <span className="text-gold-600 font-bold">{complexX.re.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-3" max="3" step="0.1" value={complexX.re} 
                    onChange={(e) => setComplexX({ ...complexX, re: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-navy-400">
                    <span>Im(x)</span>
                    <span className="text-gold-600 font-bold">{complexX.im.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-3" max="3" step="0.1" value={complexX.im} 
                    onChange={(e) => setComplexX({ ...complexX, im: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Observe how F(x) and F(1/x) are always identical
        </div>
      </div>
    </FigureContainer>
  );
};
