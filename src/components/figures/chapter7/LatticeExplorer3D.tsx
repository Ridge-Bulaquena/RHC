import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Points, PointMaterial, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

const LatticePoints = ({ maxN, showRays }: { maxN: number, showRays: boolean }) => {
  const { positions, colors, rays } = useMemo(() => {
    const pos = [];
    const cols = [];
    const color = new THREE.Color();
    const rayLines = [];

    // Selected ratios for rays
    const ratios = [
      { p: 1, q: 1, color: '#F0B800' }, // 1:1
      { p: 1, q: 2, color: '#3B82F6' }, // 1:2
      { p: 2, q: 1, color: '#EF4444' }, // 2:1
      { p: 1, q: 1.618, color: '#10B981' }, // Golden Ratio (approx)
    ];

    for (let a = 1; a <= maxN; a++) {
      for (let b = 1; b <= maxN; b++) {
        pos.push(a, 0, b); // x, y, z -> a, 0, b (2D plane in 3D)
        
        // Color by angle theta
        const theta = Math.atan2(b, a);
        const hue = theta / (Math.PI / 2);
        color.setHSL(hue * 0.1 + 0.1, 0.8, 0.5);
        cols.push(color.r, color.g, color.b);
      }
    }

    if (showRays) {
      ratios.forEach(r => {
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(maxN, 0, maxN * (r.q / r.p))
        ];
        rayLines.push({ points, color: r.color });
      });
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(cols),
      rays: rayLines
    };
  }, [maxN, showRays]);

  return (
    <group>
      <Points positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {rays.map((ray, i) => (
        <Line key={i} points={ray.points} color={ray.color} lineWidth={2} opacity={0.5} transparent />
      ))}
      <Grid infiniteGrid fadeDistance={100} sectionSize={10} sectionColor="#F0B800" sectionThickness={1} />
    </group>
  );
};

export const LatticeExplorer3D: React.FC = () => {
  const [maxN, setMaxN] = useState(50);
  const [showRays, setShowRays] = useState(true);

  return (
    <FigureWrapper
      id="fig-7-5"
      title="7.3.1 Visualization of the Integer Lattice"
      subtitle="The RHC State Space Explorer"
      caption="An interactive 3D visualization of the integer lattice points (a, b). Points with the same ratio lie on rays from the origin. The density of points increases with N, illustrating the emergence of a continuous angle distribution from discrete arithmetic."
      mathBasis="\Psi(a,b) = a + ib. This visualization confirms that the RHC state space is a discrete lattice that approximates a continuous complex plane as the integers a and b grow large."
    >
      <div className="w-full h-full bg-navy-950 flex flex-col relative">
        <div className="flex-1 relative">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[maxN * 1.5, maxN, maxN * 1.5]} fov={40} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <LatticePoints maxN={maxN} showRays={showRays} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="absolute top-8 right-8 w-64 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex justify-between">
              Lattice Size N <span>{maxN}</span>
            </label>
            <input 
              type="range" min="10" max="100" step="1" value={maxN} onChange={(e) => setMaxN(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest">Show Rays</label>
            <button 
              onClick={() => setShowRays(!showRays)}
              className={`w-10 h-5 rounded-full transition-colors relative ${showRays ? 'bg-gold-500' : 'bg-white/20'}`}
            >
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showRays ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-cream-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-gold-500" />
              <span>1:1 Ratio</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cream-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>1:2 Ratio</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cream-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>2:1 Ratio</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cream-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Golden Ratio φ</span>
            </div>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
