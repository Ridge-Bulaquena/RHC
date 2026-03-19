import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FigureContainer } from '../FigureContainer';

export const ComplexPlaneLattice: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [maxVal, setMaxVal] = useState(20);
  const [showRays, setShowRays] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1120);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(maxVal * 1.2, maxVal * 1.2, maxVal * 1.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Grid Helper
    const gridHelper = new THREE.GridHelper(maxVal * 2, maxVal, 0x3A414F, 0x1A212F);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Axes
    const axesHelper = new THREE.AxesHelper(maxVal * 1.2);
    scene.add(axesHelper);

    // Points
    const pointsGroup = new THREE.Group();
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    for (let a = 1; a <= maxVal; a++) {
      for (let b = 1; b <= maxVal; b++) {
        const r = Math.sqrt(a * a + b * b);
        const theta = Math.atan(b / a);
        
        const color = new THREE.Color();
        color.setHSL(theta / (Math.PI / 2), 0.8, 0.6);
        
        const material = new THREE.MeshBasicMaterial({ color });
        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.set(a, b, 0);
        sphere.scale.setScalar(0.5 + (r / (maxVal * 1.414)) * 0.5);
        pointsGroup.add(sphere);
      }
    }
    scene.add(pointsGroup);

    // Rays
    const raysGroup = new THREE.Group();
    if (showRays) {
      const rayAngles = [Math.PI / 4, Math.atan(1/2), Math.atan(2), Math.atan(1/1.618)];
      rayAngles.forEach(angle => {
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(maxVal * 1.5 * Math.cos(angle), maxVal * 1.5 * Math.sin(angle), 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xF0B800, transparent: true, opacity: 0.5 });
        const line = new THREE.Line(geometry, material);
        raysGroup.add(line);
      });
    }
    scene.add(raysGroup);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      pointsGroup.rotation.z += 0.0005;
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
      sphereGeometry.dispose();
      pointsGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) child.material.dispose();
        }
      });
    };
  }, [maxVal, showRays]);

  return (
    <FigureContainer
      id="fig-1-4"
      title="Figure 1.4 — Complex Plane Integer Lattice"
      caption="Integer pairs (a,b) as points a+ib in the complex plane. Color indicates angle θ = arctan(b/a); rays show constant ratios."
      variant="dark"
    >
      <div className="relative w-full h-[500px] bg-navy-900 rounded-xl overflow-hidden shadow-inner">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-4 bg-navy-900/80 p-4 rounded-xl border border-gold-400/20 backdrop-blur-sm z-10">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Lattice Size: {maxVal}</label>
            <input 
              type="range" min="5" max="50" value={maxVal} 
              onChange={(e) => setMaxVal(Number(e.target.value))}
              className="accent-gold-400 cursor-pointer"
            />
          </div>
          <button 
            onClick={() => setShowRays(!showRays)}
            className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase transition-all ${
              showRays ? 'bg-gold-400 text-navy-800' : 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
            }`}
          >
            {showRays ? 'Hide Rays' : 'Show Rays'}
          </button>
          <div className="text-[8px] font-mono text-gold-400/50 uppercase tracking-widest text-center">
            Drag to Rotate · Scroll to Zoom
          </div>
        </div>
      </div>
    </FigureContainer>
  );
};
