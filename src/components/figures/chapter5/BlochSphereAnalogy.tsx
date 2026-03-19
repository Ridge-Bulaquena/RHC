import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, Sphere, Line, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

const BlochSphere = ({ theta }: { theta: number }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const projectionRef = useRef<THREE.Mesh>(null);

  const x = Math.cos(theta);
  const y = 0;
  const z = Math.sin(theta);

  return (
    <group>
      {/* Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhysicalMaterial 
          color="#0B1120" 
          transparent 
          opacity={0.1} 
          roughness={0.1} 
          metalness={0.1} 
          transmission={0.9} 
          thickness={1}
        />
      </mesh>

      {/* Axes */}
      <Line points={[[-2.5, 0, 0], [2.5, 0, 0]]} color="#F0B800" lineWidth={1} opacity={0.3} transparent />
      <Line points={[[0, -2.5, 0], [0, 2.5, 0]]} color="#F0B800" lineWidth={1} opacity={0.3} transparent />
      <Line points={[[0, 0, -2.5], [0, 0, 2.5]]} color="#F0B800" lineWidth={1} opacity={0.3} transparent />

      {/* Labels */}
      <Text position={[2.8, 0, 0]} fontSize={0.2} color="#F0B800">X</Text>
      <Text position={[0, 2.8, 0]} fontSize={0.2} color="#F0B800">Z</Text>
      <Text position={[0, 0, 2.8]} fontSize={0.2} color="#F0B800">Y</Text>

      {/* State Vector */}
      <group ref={arrowRef}>
        <Line points={[[0, 0, 0], [x * 2, z * 2, 0]]} color="#F0B800" lineWidth={3} />
        <Sphere args={[0.1, 16, 16]} position={[x * 2, z * 2, 0]}>
          <meshBasicMaterial color="#F0B800" />
        </Sphere>
      </group>

      {/* Projection onto X-axis */}
      <Line points={[[x * 2, z * 2, 0], [x * 2, 0, 0]]} color="#F0B800" lineWidth={1} dashed dashSize={0.1} gapSize={0.1} />
      <Sphere args={[0.08, 16, 16]} position={[x * 2, 0, 0]}>
        <meshBasicMaterial color="#F0B800" />
      </Sphere>

      <Text position={[0, -2.8, 0]} fontSize={0.15} color="#F0B800">
        ⟨σₓ⟩ = cos θ = {x.toFixed(2)}
      </Text>
    </group>
  );
};

const UnitCircle = ({ theta }: { theta: number }) => {
  const x = Math.cos(theta);
  const y = Math.sin(theta);

  return (
    <group>
      {/* Circle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#F0B800" opacity={0.3} transparent />
      </mesh>

      {/* Axes */}
      <Line points={[[-2.5, 0, 0], [2.5, 0, 0]]} color="#F0B800" lineWidth={1} opacity={0.3} transparent />
      <Line points={[[0, 0, -2.5], [0, 0, 2.5]]} color="#F0B800" lineWidth={1} opacity={0.3} transparent />

      {/* Labels */}
      <Text position={[2.8, 0, 0]} fontSize={0.2} color="#F0B800">Re</Text>
      <Text position={[0, 0, 2.8]} fontSize={0.2} color="#F0B800">Im</Text>

      {/* Point */}
      <group>
        <Line points={[[0, 0, 0], [x * 2, 0, y * 2]]} color="#F0B800" lineWidth={3} />
        <Sphere args={[0.1, 16, 16]} position={[x * 2, 0, y * 2]}>
          <meshBasicMaterial color="#F0B800" />
        </Sphere>
      </group>

      {/* Projection onto Real Axis */}
      <Line points={[[x * 2, 0, y * 2], [x * 2, 0, 0]]} color="#F0B800" lineWidth={1} dashed dashSize={0.1} gapSize={0.1} />
      <Sphere args={[0.08, 16, 16]} position={[x * 2, 0, 0]}>
        <meshBasicMaterial color="#F0B800" />
      </Sphere>

      <Text position={[0, 0, -2.8]} fontSize={0.15} color="#F0B800">
        ℱ(eⁱᶿ) = cos θ = {x.toFixed(2)}
      </Text>
    </group>
  );
};

export const BlochSphereAnalogy: React.FC = () => {
  const [theta, setTheta] = useState(Math.PI / 4);

  return (
    <FigureWrapper
      id="fig-5-5"
      title="Hypothesis 2: Fold Operator as Projection"
      subtitle="Bloch Sphere vs. Unit Circle"
      caption="The fold operator on the unit circle mimics the expectation value of the Pauli X operator on a Bloch sphere: ℱ(e^(iθ)) = cos θ = ⟨σₓ⟩."
      mathBasis="In quantum mechanics, the expectation value of the Pauli X operator for a state |ψ⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩ is ⟨σₓ⟩ = cos θ. In the RHC, the fold operator applied to a unit complex number e^(iθ) yields ℱ(e^(iθ)) = ½(e^(iθ) + e^(-iθ)) = cos θ."
    >
      <div className="w-full h-full bg-navy-900 flex flex-col relative">
        <div className="flex-1 flex flex-col md:flex-row min-h-[400px]">
          <div className="flex-1 relative border-r border-white/10">
            <div className="absolute top-4 left-4 z-10 text-[10px] font-bold text-gold-400 uppercase tracking-widest">Quantum Mechanics</div>
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <BlochSphere theta={theta} />
            </Canvas>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 z-10 text-[10px] font-bold text-gold-400 uppercase tracking-widest">Recursive Harmonic Codex</div>
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 8, 0]} fov={40} />
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <UnitCircle theta={theta} />
            </Canvas>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex justify-between">
              Angle θ <span>{(theta * 180 / Math.PI).toFixed(1)}°</span>
            </label>
            <input 
              type="range" min="0" max={Math.PI * 2} step="0.01" value={theta} onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold text-cream-400 uppercase tracking-widest">
            <span>0</span>
            <span>π/2</span>
            <span>π</span>
            <span>3π/2</span>
            <span>2π</span>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
