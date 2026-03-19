import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Hash, 
  Database, 
  Atom, 
  Cpu, 
  Network, 
  Layers, 
  Activity, 
  Maximize,
  ArrowDown,
  FileText
} from 'lucide-react';

const COLORS = {
  navy: 0x0B1120,
  gold: 0xF0B800,
  goldLight: 0xF5CC30,
  cream: 0xFDFAF5,
  carbon: 0x333333,
  silica: 0xE0E0E0,
  h2o2: 0xB0E0E6,
};

const DOMAINS = [
  { icon: <Hash className="w-4 h-4" />, name: "Recursive Harmonic Mathematics" },
  { icon: <Layers className="w-4 h-4" />, name: "Quaternionic Algebra & Complex Geometry" },
  { icon: <Atom className="w-4 h-4" />, name: "Fundamental Physics & Quantum Foundations" },
  { icon: <Database className="w-4 h-4" />, name: "Material Informatics & Molecular Realization" },
  { icon: <Network className="w-4 h-4" />, name: "Information Theory & Consciousness Studies" },
  { icon: <Activity className="w-4 h-4" />, name: "Self-Referential Systems & Fixed Points" },
  { icon: <Maximize className="w-4 h-4" />, name: "Geometric Topology & Midpoint Lattices" },
];

const KEYWORDS = [
  "recursive harmonics", "quaternions", "fold operator", "midpoint lattice", "carbon",
  "silicon dioxide", "hydrogen peroxide", "material realization", "logical states",
  "self-observation", "fixed points", "reverse derivation", "number theory",
  "quantum foundations", "consciousness", "atan2 gradient", "GCD collapse",
  "directed zero", "neuromorphic computing", "redox chemistry"
];

export const TitlePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.navy);
    scene.fog = new THREE.FogExp2(COLORS.navy, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(20, 15, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(COLORS.gold, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    // Space-Time Fabric (Grid)
    const gridSize = 60;
    const gridDivisions = 40;
    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const lineIndices = [];

    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (i / gridDivisions - 0.5) * gridSize;
        const z = (j / gridDivisions - 0.5) * gridSize;
        vertices.push(x, 0, z);
      }
    }

    for (let i = 0; i < gridDivisions; i++) {
      for (let j = 0; j < gridDivisions; j++) {
        const row1 = i * (gridDivisions + 1);
        const row2 = (i + 1) * (gridDivisions + 1);
        lineIndices.push(row1 + j, row1 + j + 1);
        lineIndices.push(row1 + j, row2 + j);
      }
    }
    // Add last edges
    for (let i = 0; i < gridDivisions; i++) {
      const lastRow = gridDivisions * (gridDivisions + 1);
      lineIndices.push(lastRow + i, lastRow + i + 1);
      const lastCol = gridDivisions;
      lineIndices.push(i * (gridDivisions + 1) + lastCol, (i + 1) * (gridDivisions + 1) + lastCol);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    gridGeometry.setIndex(lineIndices);

    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: COLORS.gold, 
      transparent: true, 
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(grid);

    // Finer Secondary Grid
    const fineGridGeometry = new THREE.BufferGeometry();
    const fineVertices = [];
    const fineIndices = [];
    const fineDivisions = 80;
    for (let i = 0; i <= fineDivisions; i++) {
      for (let j = 0; j <= fineDivisions; j++) {
        fineVertices.push((i / fineDivisions - 0.5) * gridSize, 0, (j / fineDivisions - 0.5) * gridSize);
      }
    }
    for (let i = 0; i < fineDivisions; i++) {
      for (let j = 0; j < fineDivisions; j++) {
        const r1 = i * (fineDivisions + 1);
        const r2 = (i + 1) * (fineDivisions + 1);
        fineIndices.push(r1 + j, r1 + j + 1, r1 + j, r2 + j);
      }
    }
    fineGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fineVertices, 3));
    fineGridGeometry.setIndex(fineIndices);
    const fineGridMaterial = new THREE.LineBasicMaterial({ color: COLORS.gold, transparent: true, opacity: 0.03 });
    const fineGrid = new THREE.LineSegments(fineGridGeometry, fineGridMaterial);
    scene.add(fineGrid);

    // Glowing Nodes at intersections
    const nodeCount = 400;
    const nodeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: COLORS.goldLight, transparent: true, opacity: 0.6 });
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    scene.add(nodes);
    const nodeDummy = new THREE.Object3D();

    // Distant Stars
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation Loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      
      controls.update();
      
      // Deform Grid (Space-Time Fabric)
      const positions = gridGeometry.attributes.position.array as Float32Array;
      const finePositions = fineGridGeometry.attributes.position.array as Float32Array;
      
      const updateY = (x: number, z: number) => {
        let y = Math.sin(x * 0.08 + time * 0.5) * Math.cos(z * 0.08 + time * 0.5) * 1.2;
        const wells = [
          { x: Math.sin(time * 0.2) * 12, z: Math.cos(time * 0.2) * 12, strength: 5 },
          { x: Math.cos(time * 0.15) * 18, z: Math.sin(time * 0.15) * 18, strength: 4 }
        ];
        wells.forEach(well => {
          const dx = x - well.x;
          const dz = z - well.z;
          const distSq = dx * dx + dz * dz;
          y -= well.strength / (Math.sqrt(distSq) + 3);
        });
        return y;
      };

      for (let i = 0; i <= gridDivisions; i++) {
        for (let j = 0; j <= gridDivisions; j++) {
          const idx = (i * (gridDivisions + 1) + j) * 3;
          positions[idx + 1] = updateY(positions[idx], positions[idx + 2]);
        }
      }
      gridGeometry.attributes.position.needsUpdate = true;

      for (let i = 0; i <= fineDivisions; i++) {
        for (let j = 0; j <= fineDivisions; j++) {
          const idx = (i * (fineDivisions + 1) + j) * 3;
          finePositions[idx + 1] = updateY(finePositions[idx], finePositions[idx + 2]);
        }
      }
      fineGridGeometry.attributes.position.needsUpdate = true;

      // Update Nodes
      for (let i = 0; i < nodeCount; i++) {
        const row = Math.floor(i / 20) * 2;
        const col = (i % 20) * 2;
        const idx = (row * (gridDivisions + 1) + col) * 3;
        nodeDummy.position.set(positions[idx], positions[idx + 1], positions[idx + 2]);
        nodeDummy.scale.setScalar(0.5 + Math.sin(time * 2 + i) * 0.5);
        nodeDummy.updateMatrix();
        nodes.setMatrixAt(i, nodeDummy.matrix);
      }
      nodes.instanceMatrix.needsUpdate = true;

      stars.rotation.y += 0.0001;

      composer.render();
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-navy-800 no-pdf">
      {/* Three.js Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl w-full text-center space-y-12"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tighter"
              style={{ textShadow: '0 0 40px rgba(240, 184, 0, 0.3)' }}
            >
              Recursive Harmonic Codex
            </motion.h1>
            <p className="text-xl md:text-3xl font-serif italic text-gold-400 max-w-3xl mx-auto">
              How relationships between numbers can be visualized and linked to information and physical systems
            </p>
          </div>

          {/* Author Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-navy-800/40 backdrop-blur-xl border border-gold-400/20 rounded-2xl p-8 md:p-12 text-left grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12"
          >
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <User className="w-5 h-5 text-gold-400" />
                  <span className="text-2xl font-serif">Richard Bolt</span>
                </div>
                <div className="flex items-center gap-2 text-navy-150">
                  <Calendar className="w-5 h-5" />
                  <span>March 2026</span>
                </div>
                <div className="flex items-center gap-2 text-navy-150">
                  <MapPin className="w-5 h-5" />
                  <span>Labrador, QLD 4215, Australia</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400">Professional Bio</h3>
                <p className="text-navy-100 leading-relaxed text-sm md:text-base opacity-90">
                  Richard Bolt is an independent researcher and theorist whose work focuses on the intersection of recursive harmonic mathematics, quaternionic algebra, and fundamental physics. Operating without formal institutional affiliation, Bolt has developed the Recursive Harmonic Codex (RHC), a unifying framework that posits reality as a self-observing, recursively folding structure guided by geometric and harmonic principles.
                </p>
                <p className="text-navy-100 leading-relaxed text-sm md:text-base opacity-90">
                  His recent work, "The missed ratio that solves space time" (March 2026), explores a material realisation of the RHC, identifying carbon (C), silicon dioxide (SiO₂), and hydrogen peroxide (H₂O₂) as physical embodiments of logical states and the "fold operator."
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://orcid.org/0009-0006-8135-600X" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all group"
                >
                  <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID" className="w-4 h-4" />
                  <span className="text-xs text-white">ORCID: 0009-0006-8135-600X</span>
                  <ExternalLink className="w-3 h-3 text-navy-150 group-hover:text-gold-400" />
                </a>
                <a 
                  href="https://doi.org/10.5281/zenodo.18918672" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all group"
                >
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span className="text-xs text-white">DOI: 10.5281/zenodo.18918672</span>
                  <ExternalLink className="w-3 h-3 text-navy-150 group-hover:text-gold-400" />
                </a>
                <a 
                  href="mailto:richard@boltdj.com" 
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all group"
                >
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span className="text-xs text-white">richard@boltdj.com</span>
                </a>
              </div>
            </div>

            <div className="space-y-8 border-l border-white/10 pl-8 hidden lg:block">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400">Research Domains</h3>
                <div className="flex flex-col gap-3">
                  {DOMAINS.map((domain, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-xs text-navy-150 hover:text-white transition-colors cursor-default"
                    >
                      <span className="text-gold-400">{domain.icon}</span>
                      <span>{domain.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keywords Cloud */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {KEYWORDS.map((word, i) => (
              <span 
                key={i}
                className="text-[10px] md:text-xs uppercase tracking-widest text-navy-150 hover:text-gold-400 transition-colors cursor-default border border-white/5 px-3 py-1 rounded-sm bg-white/5"
              >
                {word}
              </span>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-12"
          >
            <a href="#abstract" className="flex flex-col items-center gap-2 text-navy-150 hover:text-gold-400 transition-colors">
              <span className="text-[10px] uppercase tracking-widest">Explore Codex</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Holographic DOI/ORCID Floating */}
      <div className="absolute top-12 right-12 space-y-4 hidden xl:block opacity-30 pointer-events-none">
        <div className="text-[10px] font-mono text-gold-400 rotate-90 origin-right">
          DOI: 10.5281/zenodo.18918672
        </div>
        <div className="text-[10px] font-mono text-gold-400 rotate-90 origin-right pt-24">
          ORCID: 0009-0006-8135-600X
        </div>
      </div>
    </div>
  );
};
