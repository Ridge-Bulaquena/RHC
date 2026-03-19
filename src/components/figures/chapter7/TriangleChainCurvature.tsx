import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';

export const TriangleChainCurvature: React.FC = () => {
  const [pairs, setPairs] = useState<[number, number][]>([[3, 4], [5, 12], [8, 15]]);
  const [newA, setNewA] = useState(20);
  const [newB, setNewB] = useState(21);

  const chainData = useMemo(() => {
    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;
    const points: { x: number; y: number; angle: number; a: number; b: number; c: number }[] = [];

    pairs.forEach(([a, b]) => {
      const c = Math.sqrt(a * a + b * b);
      const theta = Math.atan2(b, a);
      
      points.push({ x: currentX, y: currentY, angle: theta, a, b, c });
      
      currentX += c * Math.cos(currentAngle);
      currentY += c * Math.sin(currentAngle);
      currentAngle += theta;
    });

    // Final point
    points.push({ x: currentX, y: currentY, angle: 0, a: 0, b: 0, c: 0 });

    return { points, totalAngle: currentAngle };
  }, [pairs]);

  const addPair = () => {
    if (newA > 0 && newB > 0) {
      setPairs([...pairs, [newA, newB]]);
    }
  };

  const clearChain = () => setPairs([]);

  // Scaling for SVG
  const allX = chainData.points.map(p => p.x);
  const allY = chainData.points.map(p => p.y);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  
  const width = maxX - minX || 1;
  const height = maxY - minY || 1;
  const maxDim = Math.max(width, height);
  const scale = 300 / maxDim;

  const offsetX = -minX * scale - (width * scale) / 2;
  const offsetY = -minY * scale - (height * scale) / 2;

  return (
    <FigureWrapper
      id="fig-7-8"
      title="Triangle Chain Curvature Simulation"
      caption="Visualizing the path formed by a sequence of RHC triangles. The 'curvature' is defined by the deviation of the total angle from π."
      mathBasis="K = \pi - \sum_{k=1}^n \arctan(b_k/a_k)"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cream-50 p-6 rounded-xl border border-cream-200">
            <h4 className="font-serif font-bold mb-4">Chain Controls</h4>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-cream-600 mb-1">a</label>
                <input 
                  type="number" 
                  value={newA} 
                  onChange={e => setNewA(parseInt(e.target.value))}
                  className="w-full bg-white border border-cream-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-cream-600 mb-1">b</label>
                <input 
                  type="number" 
                  value={newB} 
                  onChange={e => setNewB(parseInt(e.target.value))}
                  className="w-full bg-white border border-cream-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={addPair}
                  className="bg-navy-600 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <button 
              onClick={clearChain}
              className="text-xs text-red-600 hover:underline"
            >
              Clear Chain
            </button>

            <div className="mt-6">
              <h5 className="text-sm font-bold mb-2 text-navy-800">Current Chain:</h5>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-cream-200 rounded-lg bg-white">
                {pairs.map((p, i) => (
                  <span key={i} className="px-2 py-1 bg-navy-100 text-navy-800 rounded text-xs font-mono">
                    ({p[0]}, {p[1]})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-navy-900 p-6 rounded-xl text-cream-100">
            <h4 className="font-serif font-bold mb-4">Curvature Metrics</h4>
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest opacity-60">Total Angle (Σθ)</span>
                <div className="text-2xl font-mono">{(chainData.totalAngle).toFixed(4)} rad</div>
                <div className="text-sm opacity-60">({(chainData.totalAngle * 180 / Math.PI).toFixed(2)}°)</div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest opacity-60">Curvature (π - Σθ)</span>
                <div className="text-2xl font-mono text-gold-400">{(Math.PI - chainData.totalAngle).toFixed(4)} rad</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] leading-relaxed opacity-70 italic">
                  In the RHC, a curvature of 0 (Σθ = π) represents a 'flat' sequence, analogous to a geodesic in a discrete manifold.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-video bg-white rounded-xl border border-cream-200 overflow-hidden flex items-center justify-center">
          <svg viewBox="-200 -200 400 400" className="w-full h-full">
            <g transform={`translate(${offsetX}, ${offsetY}) scale(1, -1)`}>
              {/* Grid lines (subtle) */}
              <g opacity="0.1">
                {Array.from({ length: 21 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <line x1="-1000" y1={(i - 10) * 50} x2="1000" y2={(i - 10) * 50} stroke="#000" strokeWidth="1" />
                    <line x1={(i - 10) * 50} y1="-1000" x2={(i - 10) * 50} y2="1000" stroke="#000" strokeWidth="1" />
                  </React.Fragment>
                ))}
              </g>

              {/* Chain Path */}
              {chainData.points.slice(0, -1).map((p, i) => {
                const next = chainData.points[i+1];
                return (
                  <motion.line
                    key={i}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.2 }}
                    x1={p.x * scale}
                    y1={p.y * scale}
                    x2={next.x * scale}
                    y2={next.y * scale}
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Points */}
              {chainData.points.map((p, i) => (
                <motion.circle 
                  key={i} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  cx={p.x * scale} 
                  cy={p.y * scale} 
                  r={i === 0 || i === chainData.points.length - 1 ? "6" : "4"} 
                  fill={i === 0 ? "#10b981" : i === chainData.points.length - 1 ? "#ef4444" : "#4285f4"} 
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
          <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] uppercase tracking-widest font-bold">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#10b981]" /> Start</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#ef4444]" /> End</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4285f4]" /> Vertex</div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
