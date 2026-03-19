import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Zap, Box } from 'lucide-react';

const QuantumSphere: React.FC<{ isQuantum: boolean }> = ({ isQuantum }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={isQuantum ? "#8b5cf6" : "#3b82f6"}
          speed={isQuantum ? 5 : 1}
          distort={isQuantum ? 0.4 : 0.1}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive={isQuantum ? "#4c1d95" : "#1e3a8a"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Interference Patterns (Points) */}
      {isQuantum && (
        <points>
          <sphereGeometry args={[1.2, 32, 32]} />
          <pointsMaterial color="#a78bfa" size={0.02} transparent opacity={0.4} />
        </points>
      )}
    </Float>
  );
};

const QuantumInformationGeometry: React.FC = () => {
  const [isQuantum, setIsQuantum] = useState(false);

  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-8 my-12 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <Zap className="text-purple-400 w-8 h-8" />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-3xl font-serif italic text-white">
            Quantum Information Geometry
          </h3>
          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-[10px] font-mono text-purple-400 uppercase tracking-widest">
            Hypothetical
          </span>
        </div>
        <p className="text-slate-400 text-sm max-w-2xl">
          Extending the RHC manifold to complex-valued states. The framework 
          naturally generalizes to the Fubini-Study metric, where information 
          overlap is governed by quantum interference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Scene Area */}
        <div className="relative aspect-square bg-navy-950/50 rounded-xl border border-white/5 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            
            <QuantumSphere isQuantum={isQuantum} />
            
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <Box size={12} />
            <span>Fubini-Study Manifold</span>
          </div>
        </div>

        {/* Controls and Info */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-6">Manifold State</h4>
            
            <div className="flex gap-4">
              <button
                onClick={() => setIsQuantum(false)}
                className={`flex-1 py-4 rounded-lg border transition-all font-mono text-xs uppercase tracking-widest ${!isQuantum ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                Classical (Fisher)
              </button>
              <button
                onClick={() => setIsQuantum(true)}
                className={`flex-1 py-4 rounded-lg border transition-all font-mono text-xs uppercase tracking-widest ${isQuantum ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                Quantum (Fubini)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div 
              className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg"
              animate={{ opacity: isQuantum ? 1 : 0.5 }}
            >
              <h5 className="text-purple-200 font-serif italic text-lg mb-1">Complex Phase Space</h5>
              <p className="text-sm text-slate-400">
                In the quantum regime, the RHC angle θ is extended to a complex phase, 
                allowing for the representation of superposition and entanglement 
                within the information-geometric framework.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono uppercase tracking-widest text-center">
        Figure 4.9: Extension to Quantum Information Geometry. The RHC framework generalizes to the Fubini-Study metric.
      </div>
    </div>
  );
};

export default QuantumInformationGeometry;
