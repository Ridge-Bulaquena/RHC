import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathComp } from '../../Math';
import { FigureWrapper } from '../FigureWrapper';
import { Plus, Minus, Info, ChevronRight, RefreshCw, Zap } from 'lucide-react';

interface Triangle {
  id: number;
  a: number;
  b: number;
  theta: number;
}

export const TriangleChainCurvature: React.FC = () => {
  const [triangles, setTriangles] = useState<Triangle[]>([
    { id: 1, a: 1, b: 1, theta: Math.PI / 4 },
    { id: 2, a: 2, b: 1, theta: Math.atan(1/2) },
    { id: 3, a: 3, b: 1, theta: Math.atan(1/3) }
  ]);

  const addTriangle = () => {
    if (triangles.length >= 8) return;
    const last = triangles[triangles.length - 1];
    setTriangles([...triangles, { id: Date.now(), a: last.a, b: last.b, theta: last.theta }]);
  };

  const removeTriangle = () => {
    if (triangles.length <= 1) return;
    setTriangles(triangles.slice(0, -1));
  };

  const updateTriangle = (id: number, a: number, b: number) => {
    setTriangles(triangles.map(t => t.id === id ? { ...t, a, b, theta: Math.atan(b/a) } : t));
  };

  const totalTheta = useMemo(() => triangles.reduce((sum, t) => sum + t.theta, 0), [triangles]);
  const curvatureK = Math.PI - totalTheta;

  // Calculate vertices for drawing
  const vertices = useMemo(() => {
    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;
    const points = [{ x: 0, y: 0 }];

    triangles.forEach(t => {
      const r = 40; // Fixed visual length for each triangle hypotenuse
      currentAngle += t.theta;
      currentX += r * Math.cos(currentAngle);
      currentY -= r * Math.sin(currentAngle);
      points.push({ x: currentX, y: currentY });
    });

    return points;
  }, [triangles]);

  return (
    <FigureWrapper
      id="fig-5-8"
      title="Hypothesis 3: Triangle Chain and Curvature"
      subtitle="K = π - Σθₖ"
      caption="A chain of triangles with angles θₖ. The curvature analogue K = π - Σθₖ measures deviation from flatness. For a closed chain, K corresponds to angle deficit."
      mathBasis="In discrete geometry, the curvature at a vertex is defined by the angle deficit. For a one-dimensional chain of triangles, we define K = π - Σθₖ. If K=0, the chain is 'flat' and closes perfectly if it returns to the origin."
    >
      <div className="w-full h-full bg-cream-50 p-8 flex flex-col gap-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Visual Area */}
          <div className="flex-[2] bg-white border border-cream-200 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-navy-400 uppercase tracking-widest">Triangle Chain</div>
            
            <svg viewBox="-100 -100 200 200" className="w-full h-full max-w-[400px]">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0B800" strokeWidth="0.1" opacity="0.2" />
                </pattern>
              </defs>
              <rect x="-100" y="-100" width="200" height="200" fill="url(#grid)" />

              {/* The Chain */}
              <g transform="translate(-40, 40)">
                {triangles.map((t, i) => {
                  const p1 = vertices[i];
                  const p2 = vertices[i+1];
                  return (
                    <motion.g key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <path 
                        d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p2.x} ${p1.y} Z`} 
                        fill={`rgba(240, 184, 0, ${0.1 + (i / triangles.length) * 0.4})`}
                        stroke="#F0B800"
                        strokeWidth="1"
                      />
                      <circle cx={p2.x} cy={p2.y} r="2" fill="#0B1120" />
                    </motion.g>
                  );
                })}
                
                {/* Deficit Arc if not closed */}
                {Math.abs(curvatureK) > 0.01 && (
                  <motion.path
                    d={`M 0 0 L ${vertices[vertices.length-1].x} ${vertices[vertices.length-1].y}`}
                    stroke="#EA4335"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </g>
            </svg>

            {/* Curvature Display */}
            <div className="absolute bottom-8 right-8 text-right">
              <div className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Total Curvature K</div>
              <div className={cn(
                "text-3xl font-bold font-serif",
                Math.abs(curvatureK) < 0.01 ? "text-emerald-600" : "text-navy-900"
              )}>
                {curvatureK.toFixed(4)}
                {Math.abs(curvatureK) < 0.01 && <Zap className="inline-block ml-2 w-6 h-6 text-emerald-500 animate-pulse" />}
              </div>
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">
                Σθ = {(totalTheta * 180 / Math.PI).toFixed(1)}°
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-serif text-navy-900">Chain Builder</h4>
              <div className="flex gap-2">
                <button onClick={removeTriangle} className="p-2 bg-cream-100 text-navy-900 rounded-lg hover:bg-cream-200 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <button onClick={addTriangle} className="p-2 bg-navy-900 text-gold-400 rounded-lg hover:bg-navy-800 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px]">
              {triangles.map((t, i) => (
                <div key={t.id} className="p-4 bg-white border border-cream-200 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Triangle {i+1}</span>
                    <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">θ = {(t.theta * 180 / Math.PI).toFixed(1)}°</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">a <span>{t.a}</span></label>
                      <input type="range" min="1" max="10" value={t.a} onChange={(e) => updateTriangle(t.id, parseInt(e.target.value), t.b)} className="w-full accent-gold-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-navy-400 uppercase tracking-widest flex justify-between">b <span>{t.b}</span></label>
                      <input type="range" min="1" max="10" value={t.b} onChange={(e) => updateTriangle(t.id, t.a, parseInt(e.target.value))} className="w-full accent-gold-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setTriangles([{ id: 1, a: 1, b: 1, theta: Math.PI / 4 }, { id: 2, a: 2, b: 1, theta: Math.atan(1/2) }, { id: 3, a: 3, b: 1, theta: Math.atan(1/3) }])}
              className="w-full py-3 bg-cream-100 text-navy-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-cream-200 transition-all"
            >
              Reset to Flat Example
            </button>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
