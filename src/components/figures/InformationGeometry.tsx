import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { motion, AnimatePresence } from 'motion/react';
import { FigureContainer } from '../FigureContainer';
import { Info, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

export const InformationGeometry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0.5);
  const [view, setView] = useState<'simplex' | 'sphere'>('simplex');

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Simplex (Line for 2-outcome case)
    const simplexGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0)
    ]);
    const simplexMaterial = new THREE.LineBasicMaterial({ color: 0xF0B800, linewidth: 2 });
    const simplexLine = new THREE.Line(simplexGeometry, simplexMaterial);
    scene.add(simplexLine);

    // Sphere (Unit sphere for mapping)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x1C2845, wireframe: true, transparent: true, opacity: 0.1 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Point on Simplex
    const pointOnSimplex = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF0B800 })
    );
    scene.add(pointOnSimplex);

    // Point on Sphere (Mapping: θ = 2 arcsin(√p))
    const pointOnSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF0B800 })
    );
    scene.add(pointOnSphere);

    // Arc on Sphere
    const arcPoints = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const theta = 2 * Math.asin(Math.sqrt(t));
      arcPoints.push(new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0));
    }
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xF0B800, transparent: true, opacity: 0.5 });
    const arc = new THREE.Line(arcGeometry, arcMaterial);
    scene.add(arc);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update points based on p
      pointOnSimplex.position.x = p;
      
      const theta = 2 * Math.asin(Math.sqrt(p));
      pointOnSphere.position.set(Math.cos(theta), Math.sin(theta), 0);

      // Visibility based on view
      simplexLine.visible = view === 'simplex';
      pointOnSimplex.visible = view === 'simplex';
      sphere.visible = view === 'sphere';
      pointOnSphere.visible = view === 'sphere';
      arc.visible = view === 'sphere';

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, [p, view]);

  return (
    <FigureContainer
      id="fig-2-13"
      title="Figure 2.13 — Information Geometry of the Binomial Distribution"
      caption="The space of binomial distributions p ∈ [0,1] can be mapped to a unit sphere using the Fisher information metric. The distance between distributions is the angle between their points on the sphere."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <div ref={containerRef} className="w-full h-full max-h-[450px]" />

        {/* Info Panel */}
        <div className="absolute top-8 left-8 bg-navy-800/80 backdrop-blur-md border border-gold-400/30 p-6 rounded-2xl shadow-2xl flex flex-col gap-4 w-64">
          <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Fisher Information Mapping</div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-cream-400">
                <span>Probability (p)</span>
                <span className="text-gold-400 font-bold">{p.toFixed(3)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.001" value={p} 
                onChange={(e) => setP(parseFloat(e.target.value))}
                className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-cream-400">
                <span>Angle (θ)</span>
                <span className="text-gold-400 font-bold">{(2 * Math.asin(Math.sqrt(p)) * 180 / Math.PI).toFixed(1)}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 w-full max-w-md flex gap-4">
          <button
            onClick={() => setView('simplex')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
              view === 'simplex' ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
            }`}
          >
            Probability Simplex
          </button>
          <button
            onClick={() => setView('sphere')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${
              view === 'sphere' ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-white'
            }`}
          >
            Fisher Information Sphere
          </button>
        </div>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Drag to rotate the 3D scene
        </div>
      </div>
    </FigureContainer>
  );
};
