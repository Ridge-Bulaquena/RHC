import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FigureContainer } from '../FigureContainer';

export const InformationGeometryPrimer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [curvature, setCurvature] = useState(1.0);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFDFAF5);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(15, 15, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Parametric Surface (Statistical Manifold)
    const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x0B1120, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const surface = new THREE.Mesh(geometry, material);
    surface.rotation.x = -Math.PI / 2;
    scene.add(surface);

    // Points on Surface
    const pointGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const pointMaterial = new THREE.MeshPhongMaterial({ color: 0xF0B800, emissive: 0xF0B800, emissiveIntensity: 0.5 });
    const p1 = new THREE.Mesh(pointGeometry, pointMaterial);
    const p2 = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(p1);
    scene.add(p2);

    // Geodesic Curve
    const curveMaterial = new THREE.LineBasicMaterial({ color: 0xF0B800, linewidth: 2 });
    const curvePoints = Array.from({ length: 51 }, () => new THREE.Vector3());
    const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const geodesic = new THREE.Line(curveGeometry, curveMaterial);
    scene.add(geodesic);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0008;
      
      // Update Surface
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Gaussian-like curvature
        const dist = Math.sqrt(x*x + y*y);
        const z = Math.exp(-dist * 0.1) * Math.sin(x * 0.3 + time) * curvature * 2;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      // Update Points
      const x1 = -6, y1 = -6;
      const x2 = 6, y2 = 6;
      
      const getZ = (x: number, y: number) => {
        const dist = Math.sqrt(x*x + y*y);
        return Math.exp(-dist * 0.1) * Math.sin(x * 0.3 + time) * curvature * 2;
      };

      const z1 = getZ(x1, y1);
      const z2 = getZ(x2, y2);
      p1.position.set(x1, z1, y1);
      p2.position.set(x2, z2, y2);

      // Update Geodesic (Linear approximation on curved surface)
      const pts = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        const xt = x1 + (x2 - x1) * t;
        const yt = y1 + (y2 - y1) * t;
        const zt = getZ(xt, yt);
        pts.push(new THREE.Vector3(xt, zt, yt));
      }
      geodesic.geometry.setFromPoints(pts);

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
      pointGeometry.dispose();
      pointMaterial.dispose();
      curveGeometry.dispose();
      curveMaterial.dispose();
    };
  }, [curvature]);

  return (
    <FigureContainer
      id="fig-1-5"
      title="Figure 1.5 — Information Geometry Primer"
      caption="A statistical manifold with the Fisher-Rao metric. Geodesic distance quantifies distinguishability between probability distributions."
      variant="light"
    >
      <div className="relative w-full h-[500px] bg-cream-50 rounded-xl overflow-hidden shadow-inner">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-4 bg-cream-50/80 p-4 rounded-xl border border-navy-800/20 backdrop-blur-sm z-10">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-navy-800 uppercase tracking-widest">Manifold Curvature: {curvature.toFixed(1)}</label>
            <input 
              type="range" min="0" max="5" step="0.1" value={curvature} 
              onChange={(e) => setCurvature(Number(e.target.value))}
              className="accent-navy-800 cursor-pointer"
            />
          </div>
          <div className="text-[10px] font-mono text-navy-600 uppercase tracking-widest leading-tight text-center">
            Drag to Rotate · Scroll to Zoom
          </div>
        </div>
      </div>
    </FigureContainer>
  );
};
