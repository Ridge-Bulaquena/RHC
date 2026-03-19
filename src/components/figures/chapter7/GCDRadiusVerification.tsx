import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Points, PointMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

function gcd(x: number, y: number): number {
  return !y ? x : gcd(y, x % y);
}

const LatticePoints = ({ maxN }: { maxN: number }) => {
  const { positions, colors } = useMemo(() => {
    const pos = [];
    const cols = [];
    const color = new THREE.Color();

    for (let a = 1; a <= maxN; a++) {
      for (let b = 1; b <= maxN; b++) {
        const d = gcd(a, b);
        pos.push(a, d, b); // x, y, z -> a, d, b
        
        // Color by ratio b/a
        const hue = Math.atan2(b, a) / (Math.PI / 2);
        color.setHSL(hue * 0.1 + 0.1, 0.8, 0.5);
        cols.push(color.r, color.g, color.b);
      }
    }
    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(cols),
    };
  }, [maxN]);

  return (
    <group>
      <Points positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Grid infiniteGrid fadeDistance={50} sectionSize={5} sectionColor="#F0B800" sectionThickness={1} />
    </group>
  );
};

export const GCDRadiusVerification: React.FC = () => {
  const [maxN, setMaxN] = useState(30);

  return (
    <FigureWrapper
      id="fig-7-1"
      title="7.2.1 GCD-Radius Verification"
      subtitle="3D Lattice of (a, d, b)"
      caption="A 3D scatter plot where the vertical axis represents the GCD of the horizontal coordinates (a, b). Points with the same ratio b/a lie on rays, and their vertical position d confirms the radial scaling theorem."
      mathBasis="d = \gcd(a,b) = \frac{\sqrt{a^2+b^2}}{\sqrt{p^2+q^2}}. This visualization confirms that the GCD is exactly the scaling factor between the full vector and its primitive counterpart."
    >
      <div className="w-full h-full bg-navy-900 flex flex-col relative">
        <div className="flex-1 relative">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[maxN, maxN, maxN]} fov={40} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <LatticePoints maxN={maxN} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex justify-between">
              Lattice Size N <span>{maxN}x{maxN}</span>
            </label>
            <input 
              type="range" min="10" max="100" step="1" value={maxN} onChange={(e) => setMaxN(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold text-cream-400 uppercase tracking-widest">
            <span>Points: {maxN * maxN}</span>
            <span className="text-gold-400">Vertical Axis = GCD(a,b)</span>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
