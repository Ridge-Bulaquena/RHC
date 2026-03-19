import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FigureContainer } from '../FigureContainer';
import { motion } from 'motion/react';
import { Info, Play, Pause, RefreshCw } from 'lucide-react';

export const FoldEuclideanSpiral: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [a, setA] = useState(55);
  const [b, setB] = useState(34);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1120);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Generate Euclidean Steps
    const steps: { a: number, b: number, q: number, r: number, z: THREE.Vector3, fold: number }[] = [];
    let currA = a;
    let currB = b;
    let angle = 0;
    let radius = 50;

    while (currB > 0) {
      const q = Math.floor(currA / currB);
      const r = currA % currB;
      const theta = Math.atan(currB / currA);
      
      // Fold value F(z/z')
      const z = new THREE.Vector3(currA, currB, 0);
      const zPrime = new THREE.Vector3(currB, r, 0);
      const fold = Math.cos(Math.atan(currB/currA) - Math.atan(r/currB));

      steps.push({ a: currA, b: currB, q, r, z, fold });
      
      currA = currB;
      currB = r;
    }

    // Create Spiral Path
    const curvePoints = [];
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const t = i / steps.length;
      const r = radius * (1 - t);
      const ang = i * Math.PI * 0.5;
      curvePoints.push(new THREE.Vector3(r * Math.cos(ang), r * Math.sin(ang), i * 5));
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const geometry = new THREE.TubeGeometry(curve, 64, 0.5, 8, false);
    const material = new THREE.MeshPhongMaterial({ color: 0xF0B800, emissive: 0x443300 });
    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);

    // Add Fold "Glows" as bars
    steps.forEach((step, i) => {
      const point = curvePoints[i];
      const barHeight = step.fold * 20;
      const barGeo = new THREE.CylinderGeometry(0.2, 0.2, barHeight, 8);
      const barMat = new THREE.MeshBasicMaterial({ 
        color: 0xF0B800, 
        transparent: true, 
        opacity: 0.6 
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.copy(point);
      bar.position.y += barHeight / 2;
      scene.add(bar);

      // Add a glow sprite or point light
      const light = new THREE.PointLight(0xF0B800, 1, 10);
      light.position.copy(point);
      scene.add(light);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (isPlaying) {
        scene.rotation.y += 0.005;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isPlaying, a, b]);

  return (
    <FigureContainer
      id="fig-3-5"
      title="Figure 3.5 — Fold Dynamics in the Euclidean Spiral"
      caption="Theorem 3.5 visualized: The fold operator F(z/z') measures the angular change between successive steps of the Euclidean algorithm. The spiral represents the iterative reduction, with vertical bars indicating the magnitude of the fold value."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden shadow-inner">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        
        {/* Controls Overlay */}
        <div className="absolute top-6 right-6 flex flex-col gap-4 bg-navy-900/80 p-6 rounded-2xl border border-gold-400/20 backdrop-blur-md z-10 max-w-[200px]">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Input A: {a}</label>
            <input 
              type="range" min="10" max="100" value={a} 
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Input B: {b}</label>
            <input 
              type="range" min="10" max="100" value={b} 
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
            />
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase bg-gold-400 text-navy-900 font-bold hover:bg-gold-300 transition-all"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause' : 'Rotate'}
          </button>
          <div className="text-[8px] font-mono text-gold-400/50 uppercase tracking-widest text-center">
            Drag to Explore · Scroll to Zoom
          </div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          The spiral converges as the GCD is reached
        </div>
      </div>
    </FigureContainer>
  );
};
