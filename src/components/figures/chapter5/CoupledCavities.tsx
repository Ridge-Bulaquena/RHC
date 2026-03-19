import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, Sphere, MeshDistortMaterial, Stars, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { FigureWrapper } from '../FigureWrapper';
import { MathComp } from '../../Math';

const Photon = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [speed] = useState(() => 0.05 + Math.random() * 0.1);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + offset) * 0.01;
      meshRef.current.position.x += Math.cos(state.clock.elapsedTime * speed + offset) * 0.01;
    }
  });

  return (
    <Sparkles count={5} scale={0.2} size={2} color={color}>
      <Sphere ref={meshRef} args={[0.05, 16, 16]} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Sphere>
    </Sparkles>
  );
};

const Cavity = ({ position, photonCount, color, label }: { position: [number, number, number], photonCount: number, color: string, label: string }) => {
  const photons = useMemo(() => {
    return Array.from({ length: photonCount }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8
      ] as [number, number, number]
    }));
  }, [photonCount]);

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]}>
          <meshPhysicalMaterial 
            color={color} 
            transparent 
            opacity={0.15} 
            roughness={0} 
            transmission={1} 
            thickness={0.5} 
            ior={1.5}
          />
        </Sphere>
        <mesh>
          <torusGeometry args={[1.05, 0.02, 16, 100]} />
          <meshBasicMaterial color={color} opacity={0.3} transparent />
        </mesh>
      </Float>

      {photons.map((p) => (
        <Photon key={p.id} position={p.position} color={color} />
      ))}

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        font="https://fonts.gstatic.com/s/robotomono/v22/L0tkDFo6GF1D6C1KNjs6FF_7.woff"
      >
        {label}: {photonCount}
      </Text>
    </group>
  );
};

const Waveguide = ({ a, b }: { a: number, b: number }) => {
  const coupling = b / a;
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 * coupling;
    }
  });

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
        <meshPhysicalMaterial 
          color="#F0B800" 
          emissive="#F0B800" 
          emissiveIntensity={coupling * 2} 
          transparent 
          opacity={0.4} 
        />
      </mesh>
      <Sparkles count={20} scale={[3, 0.5, 0.5]} size={2} color="#F0B800" />
    </group>
  );
};

export const CoupledCavities: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);

  return (
    <FigureWrapper
      id="fig-5-4"
      title="Hypothesis 1: Two‑Mode Physical System"
      subtitle="Coupled Optical Cavities"
      caption="A concrete physical realization: two coupled optical cavities with photon numbers (a,b). The ratio determines the coupling, and the total photon number sets the energy scale."
      mathBasis="The state of two coupled modes can be described by their occupation numbers (a,b). The RHC maps these integers to a complex plane where the ratio b/a determines the system's parameter θ, and r = √(a²+b²) determines the total energy scale."
    >
      <div className="w-full h-full bg-navy-900 flex flex-col relative">
        <div className="flex-1 min-h-[400px]">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <group position={[0, 0, 0]}>
              <Cavity position={[-2.5, 0, 0]} photonCount={a} color="#4285F4" label="Cavity A" />
              <Cavity position={[2.5, 0, 0]} photonCount={b} color="#EA4335" label="Cavity B" />
              <Waveguide a={a} b={b} />
            </group>

            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          <div className="flex flex-col gap-2 min-w-[120px]">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex justify-between">
              Photons a <span>{a}</span>
            </label>
            <input 
              type="range" min="1" max="10" value={a} onChange={(e) => setA(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <label className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex justify-between">
              Photons b <span>{b}</span>
            </label>
            <input 
              type="range" min="1" max="10" value={b} onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
          <div className="flex flex-col justify-center text-center">
            <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1">Ratio b/a</div>
            <div className="text-xl font-bold text-cream-50">{(b/a).toFixed(2)}</div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4285F4]" />
            <span className="text-[10px] font-bold text-cream-400 uppercase tracking-widest">Mode A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
            <span className="text-[10px] font-bold text-cream-400 uppercase tracking-widest">Mode B</span>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
};
