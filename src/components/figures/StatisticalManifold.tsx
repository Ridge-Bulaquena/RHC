import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { FigureContainer } from '../FigureContainer';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Maximize2, Minimize2, Activity } from 'lucide-react';

export const StatisticalManifold: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showCurvature, setShowCurvature] = useState(true);
  const [distance, setDistance] = useState<number>(0);
  const [p1, setP1] = useState({ mu: 0, sigma: 1 });
  const [p2, setP2] = useState({ mu: 2, sigma: 2 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1120);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Manifold Surface: Normal distributions (mu, sigma)
    // Metric: ds^2 = (dmu^2 + 2*dsigma^2) / sigma^2
    // This is hyperbolic geometry. We can map it to a surface.
    // For visualization, let's use a parametric surface that looks like a curved manifold.
    const geometry = new ParametricGeometry((u: number, v: number, target: THREE.Vector3) => {
      const mu = (u - 0.5) * 10;
      const sigma = v * 5 + 0.5;
      // Map to a surface in 3D
      // We can use the Poincare half-plane model or just a direct mapping
      const x = mu;
      const y = sigma;
      const z = Math.log(sigma) * 2; // Log scale for sigma to show curvature
      target.set(x, z, y);
    }, 50, 50);

    const material = new THREE.MeshPhongMaterial({
      color: 0x1C2845,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
    });

    const manifold = new THREE.Mesh(geometry, material);
    scene.add(manifold);

    // Grid lines
    const wireframe = new THREE.WireframeGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3A414F, transparent: true, opacity: 0.3 });
    const lines = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(lines);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xF0B800, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Geodesic Path (Simplified as a curve between two points)
    const curvePoints = [];
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const mu = p1.mu + (p2.mu - p1.mu) * t;
      const sigma = p1.sigma + (p2.sigma - p1.sigma) * t;
      // In hyperbolic space, geodesics are semi-circles or vertical lines.
      // Here we just interpolate for the visual effect on the surface.
      curvePoints.push(new THREE.Vector3(mu, Math.log(sigma) * 2, sigma));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xF0B800, linewidth: 3 });
    const geodesicLine = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(geodesicLine);

    // Spheres for points
    const sphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xF0B800 });
    const s1 = new THREE.Mesh(sphereGeo, sphereMat);
    const s2 = new THREE.Mesh(sphereGeo, sphereMat);
    s1.position.set(p1.mu, Math.log(p1.sigma) * 2, p1.sigma);
    s2.position.set(p2.mu, Math.log(p2.sigma) * 2, p2.sigma);
    scene.add(s1);
    scene.add(s2);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
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

    // Calculate Fisher Distance
    // For normal distributions: d_F^2 = ln(sigma2/sigma1)^2 + (mu1-mu2)^2 / (sigma1*sigma2) approx
    // Exact hyperbolic distance: arccosh(1 + (mu1-mu2)^2 / (2*sigma1*sigma2))
    const d = Math.acosh(1 + Math.pow(p1.mu - p2.mu, 2) / (2 * p1.sigma * p2.sigma));
    setDistance(d);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframe.dispose();
      lineMaterial.dispose();
      pathGeometry.dispose();
      pathMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
    };
  }, [p1, p2]);

  return (
    <FigureContainer
      id="fig-4-1"
      title="Figure 4.1 — Statistical Manifold and Fisher-Rao Metric"
      caption="A 3D visualization of a statistical manifold (Normal distributions). The geodesic distance between points quantifies the distinguishability of the corresponding probability distributions."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden shadow-inner">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        
        {/* Controls Overlay */}
        <div className="absolute top-6 right-6 flex flex-col gap-4 bg-navy-900/80 p-6 rounded-2xl border border-gold-400/20 backdrop-blur-md z-10 max-w-[240px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                <span>Point 1 μ</span>
                <span>{p1.mu.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-4" max="4" step="0.1" value={p1.mu} 
                onChange={(e) => setP1({ ...p1, mu: parseFloat(e.target.value) })}
                className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                <span>Point 1 σ</span>
                <span>{p1.sigma.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="0.5" max="4" step="0.1" value={p1.sigma} 
                onChange={(e) => setP1({ ...p1, sigma: parseFloat(e.target.value) })}
                className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>
            <div className="w-full h-px bg-gold-400/20" />
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                <span>Point 2 μ</span>
                <span>{p2.mu.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-4" max="4" step="0.1" value={p2.mu} 
                onChange={(e) => setP2({ ...p2, mu: parseFloat(e.target.value) })}
                className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                <span>Point 2 σ</span>
                <span>{p2.sigma.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="0.5" max="4" step="0.1" value={p2.sigma} 
                onChange={(e) => setP2({ ...p2, sigma: parseFloat(e.target.value) })}
                className="w-full h-1 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-gold-400/10 rounded-xl border border-gold-400/30">
            <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest mb-1">Fisher Distance</div>
            <div className="text-2xl font-mono text-cream-50 font-bold">{distance.toFixed(4)}</div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Drag to rotate · Scroll to zoom
        </div>
      </div>
    </FigureContainer>
  );
};

export default StatisticalManifold;
