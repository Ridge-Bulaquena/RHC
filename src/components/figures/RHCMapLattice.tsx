import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FigureContainer } from '../FigureContainer';
import { Settings, Info, Maximize2, Minimize2 } from 'lucide-react';

const RATIOS = [
  { name: '1:1', slope: 1, color: '#F0B800' },
  { name: '1:2', slope: 0.5, color: '#F5CC30' },
  { name: '2:1', slope: 2, color: '#A87E00' },
  { name: 'Golden', slope: 0.618, color: '#E3D9C5' }
];

interface PointData {
  a: number;
  b: number;
  r: number;
  theta: number;
  p: number;
  q: number;
  d: number;
}

const gcd = (a: number, b: number): number => {
  while (b) {
    a %= b;
    [a, b] = [b, a];
  }
  return a;
};

export const RHCMapLattice: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [maxVal, setMaxVal] = useState(10);
  const [showRays, setShowRays] = useState(true);
  const [is3D, setIs3D] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<PointData | null>(null);

  const points = useMemo(() => {
    const data: PointData[] = [];
    for (let a = 1; a <= maxVal; a++) {
      for (let b = 1; b <= maxVal; b++) {
        const d = gcd(a, b);
        data.push({
          a, b,
          r: Math.sqrt(a * a + b * b),
          theta: Math.atan2(b, a),
          p: a / d,
          q: b / d,
          d
        });
      }
    }
    return data;
  }, [maxVal]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1120);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 15, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Grid and Axes
    const gridHelper = new THREE.GridHelper(20, 20, 0x1c2845, 0x1c2845);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    // Instanced Mesh for Points
    const geometry = new THREE.SphereGeometry(0.15, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, points.length);
    
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    points.forEach((p, i) => {
      const z = is3D ? p.r * 0.5 : 0;
      matrix.setPosition(p.a, p.b, z);
      instancedMesh.setMatrixAt(i, matrix);
      
      // Color by angle theta (navy to gold gradient)
      const hue = 0.1 + (p.theta / (Math.PI / 2)) * 0.15;
      color.setHSL(hue, 0.8, 0.5);
      instancedMesh.setColorAt(i, color);
    });
    
    scene.add(instancedMesh);

    // Rays
    const rayGroup = new THREE.Group();
    if (showRays) {
      RATIOS.forEach(r => {
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(12, 12 * r.slope, is3D ? 8 : 0));
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: r.color, transparent: true, opacity: 0.4 });
        const line = new THREE.Line(lineGeom, lineMat);
        rayGroup.add(line);
      });
    }
    scene.add(rayGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId;
        if (instanceId !== undefined) {
          setSelectedPoint(points[instanceId]);
        }
      } else {
        setSelectedPoint(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      
      // Hover detection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0) {
        const id = intersects[0].instanceId;
        if (id !== undefined) setHoveredPoint(points[id]);
      } else {
        setHoveredPoint(null);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [points, is3D, showRays]);

  return (
    <FigureContainer
      id="fig-2-2"
      title="Figure 2.2 — The RHC Map: Integer Lattice in ℂ"
      caption="Lattice points in ℂ corresponding to integer pairs (a,b). Each point encodes the pair in its real and imaginary parts. Color indicates angle θ = arctan(b/a)."
      variant="dark"
    >
      <div className="relative w-full h-[600px] bg-navy-900 rounded-xl overflow-hidden">
        <div ref={mountRef} className="w-full h-full" />

        {/* Overlay UI */}
        <div className="absolute top-6 left-6 flex flex-col gap-4 pointer-events-none">
          <div className="bg-navy-800/80 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-auto">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-mono text-cream-50 uppercase tracking-widest">Lattice Controls</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-cream-200 mb-1">
                  <span>MAX RANGE (N)</span>
                  <span className="text-gold-400">{maxVal}</span>
                </div>
                <input 
                  type="range" min="2" max="30" value={maxVal} 
                  onChange={(e) => setMaxVal(parseInt(e.target.value))}
                  className="w-full h-1 bg-navy-600 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIs3D(!is3D)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${is3D ? 'bg-gold-400 text-navy-900' : 'bg-navy-700 text-cream-200'}`}
                >
                  {is3D ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  {is3D ? '2D View' : '3D View'}
                </button>
                <button 
                  onClick={() => setShowRays(!showRays)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${showRays ? 'bg-gold-400 text-navy-900' : 'bg-navy-700 text-cream-200'}`}
                >
                  {showRays ? 'Hide Rays' : 'Show Rays'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedPoint && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-navy-800/90 backdrop-blur-lg p-5 rounded-xl border border-gold-400/30 shadow-2xl pointer-events-auto w-64"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-gold-400 font-serif text-xl">Point Ψ({selectedPoint.a}, {selectedPoint.b})</h4>
                  <button onClick={() => setSelectedPoint(null)} className="text-cream-300 hover:text-white">×</button>
                </div>
                
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cream-400">MODULUS (r)</span>
                    <span className="text-cream-50">{selectedPoint.r.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cream-400">ANGLE (θ)</span>
                    <span className="text-cream-50">{(selectedPoint.theta * 180 / Math.PI).toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cream-400">PRIMITIVE (p,q)</span>
                    <span className="text-gold-400">({selectedPoint.p}, {selectedPoint.q})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-cream-400">GCD (d)</span>
                    <span className="text-gold-400">{selectedPoint.d}</span>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-navy-900/50 rounded text-[10px] text-cream-400 italic">
                  r = {selectedPoint.d} × √({selectedPoint.p}² + {selectedPoint.q}²)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredPoint && !selectedPoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 right-6 bg-gold-400 text-navy-900 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold shadow-lg"
            >
              Ψ({hoveredPoint.a}, {hoveredPoint.b})
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-cream-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Drag to rotate • Scroll to zoom • Click points
        </div>
      </div>
    </FigureContainer>
  );
};
