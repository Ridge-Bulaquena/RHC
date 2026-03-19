import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Ruler, MoveHorizontal } from 'lucide-react';
import { Math as MathComp } from '../Math';

const GeodesicDistancePlot: React.FC = () => {
  const [theta1, setTheta1] = useState(Math.PI / 4);
  const [theta2, setTheta2] = useState(3 * Math.PI / 4);

  const fisherDistance = useMemo(() => {
    const d1 = Math.log(Math.abs(Math.tan(theta1 / 2)));
    const d2 = Math.log(Math.abs(Math.tan(theta2 / 2)));
    return Math.abs(d1 - d2);
  }, [theta1, theta2]);

  const euclideanDistance = useMemo(() => {
    return Math.abs(theta1 - theta2);
  }, [theta1, theta2]);

  const xScale = (t: number) => (t / Math.PI) * 100;

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Ruler className="text-blue-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl font-serif italic text-white mb-2">
          Geodesic vs. Euclidean Distance
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          Comparing the straight-line distance (Euclidean) to the information distance (Fisher). 
          The Fisher distance <MathComp formula="d_F(\theta_1, \theta_2) = |\ln(\tan(\theta_2/2)) - \ln(\tan(\theta_1/2))|" /> 
          reflects the true geometric separation in information space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visualization Area */}
        <div className="relative h-48 bg-navy-950/50 rounded-xl border border-white/5 p-8 flex flex-col justify-center">
          <svg viewBox="0 0 100 20" className="w-full overflow-visible">
            {/* Base Line (Manifold) */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="1 1" />
            
            {/* Euclidean Path */}
            <motion.line 
              x1={xScale(theta1)} y1="10" x2={xScale(theta2)} y2="10"
              stroke="#3b82f6" strokeWidth="1"
              initial={false}
              animate={{ x1: xScale(theta1), x2: xScale(theta2) }}
            />
            
            {/* Fisher Path (Represented as an arc to show it's "longer" in information space) */}
            <motion.path
              d={`M ${xScale(theta1)} 10 Q ${(xScale(theta1) + xScale(theta2)) / 2} ${10 - fisherDistance * 2} ${xScale(theta2)} 10`}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              initial={false}
              animate={{ d: `M ${xScale(theta1)} 10 Q ${(xScale(theta1) + xScale(theta2)) / 2} ${10 - fisherDistance * 2} ${xScale(theta2)} 10` }}
            />

            {/* Points */}
            <motion.circle 
              cx={xScale(theta1)} cy="10" r="2" fill="#fff" 
              initial={false} animate={{ cx: xScale(theta1) }}
            />
            <motion.circle 
              cx={xScale(theta2)} cy="10" r="2" fill="#fff" 
              initial={false} animate={{ cx: xScale(theta2) }}
            />
            
            {/* Labels */}
            <text x="0" y="18" fill="rgba(255,255,255,0.3)" fontSize="3" textAnchor="middle">0</text>
            <text x="100" y="18" fill="rgba(255,255,255,0.3)" fontSize="3" textAnchor="middle">π</text>
          </svg>
          
          <div className="flex justify-between mt-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span>Deterministic (0)</span>
            <span>Uniform (π/2)</span>
            <span>Deterministic (π)</span>
          </div>
        </div>

        {/* Controls and Stats */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono">Euclidean Distance</span>
              <div className="text-2xl font-mono text-white">{euclideanDistance.toFixed(3)}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Fisher Distance</span>
              <div className="text-2xl font-mono text-white">{fisherDistance.toFixed(3)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                <span>θ₁: {(theta1 / Math.PI).toFixed(2)}π</span>
                <MoveHorizontal size={14} />
              </div>
              <input 
                type="range" min="0.1" max={Math.PI - 0.1} step="0.01" 
                value={theta1} onChange={(e) => setTheta1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                <span>θ₂: {(theta2 / Math.PI).toFixed(2)}π</span>
                <MoveHorizontal size={14} />
              </div>
              <input 
                type="range" min="0.1" max={Math.PI - 0.1} step="0.01" 
                value={theta2} onChange={(e) => setTheta2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.3: Euclidean vs. Fisher Distance. The Fisher distance represents the true "information distance" between two states.
      </div>
    </div>
  );
};

export default GeodesicDistancePlot;
