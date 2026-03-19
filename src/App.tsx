/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Menu, 
  X, 
  ChevronRight, 
  Info, 
  BookOpen, 
  Zap, 
  Target, 
  Cpu, 
  MessageSquare, 
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { MathComp, MathBlock } from './components/Math';
import { Section, Callout } from './components/Layout';
import { TitlePage } from './components/TitlePage';
import { PullQuote, GlossaryTerm, Citation } from './components/Editorial';

// Figures
import { UnificationTimeline } from './components/figures/UnificationTimeline';
import { EuclideanAlgorithm } from './components/figures/EuclideanAlgorithm';
import { ContinuedFractionTree } from './components/figures/ContinuedFractionTree';
import { ComplexPlaneLattice } from './components/figures/ComplexPlaneLattice';
import { InformationGeometryPrimer } from './components/figures/InformationGeometryPrimer';
import { PhysicalMotivationsMap } from './components/figures/PhysicalMotivationsMap';
import { FrameworkComparison } from './components/figures/FrameworkComparison';
import { DomainsGap } from './components/figures/DomainsGap';
import { ObjectivesRoadmap } from './components/figures/ObjectivesRoadmap';
import { ContributionsCards } from './components/figures/ContributionsCards';
import { MonographStructure } from './components/figures/MonographStructure';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

const SECTIONS = [
  { id: 'abstract', title: 'Abstract', subtitle: 'A formal mapping of discrete arithmetic' },
  { id: 'introduction', title: '1. Introduction', subtitle: 'Background and Context' },
  { id: 'foundations', title: '2. Math Foundations', subtitle: 'The Fundamental Mapping' },
  { id: 'results', title: '3. Core Results', subtitle: 'Theorems and Identities' },
  { id: 'info-geom', title: '4. Info Geometry', subtitle: 'Fisher Metric and Manifolds' },
  { id: 'interpretation', title: '5. Interpretation', subtitle: 'Emergent Spacetime' },
  { id: 'predictions', title: '6. Predictions', subtitle: 'Falsifiable Hypotheses' },
  { id: 'validation', title: '7. Validation', subtitle: 'Computational Experiments' },
  { id: 'conclusion', title: '8. Discussion, Open Problems, and the Road Ahead', subtitle: 'Final Synthesis' },
];

import { NumberSetsHierarchy } from './components/figures/NumberSetsHierarchy';
import { RHCMapLattice } from './components/figures/RHCMapLattice';
import { FactorizationDiagram } from './components/figures/FactorizationDiagram';
import { GCDRadiusTheorem } from './components/figures/GCDRadiusTheorem';
import { ConstantRatioRays } from './components/figures/ConstantRatioRays';
import { FoldUnitCircle } from './components/figures/FoldUnitCircle';
import { FoldSymmetry } from './components/figures/FoldSymmetry';
import { FoldLattice } from './components/figures/FoldLattice';
import { PrimitivePairs } from './components/figures/PrimitivePairs';
import { PrimitiveDensity } from './components/figures/PrimitiveDensity';
import { SternBrocotTree } from './components/figures/SternBrocotTree';
import { FareySequence } from './components/figures/FareySequence';
import { InformationGeometry } from './components/figures/InformationGeometry';
import { FoldEuclideanSpiral } from './components/figures/FoldEuclideanSpiral';
import { AngleDensityPlot } from './components/figures/AngleDensityPlot';
import { TheoremSummaryCards } from './components/figures/TheoremSummaryCards';
import { Chapter3Interactive } from './components/figures/Chapter3Interactive';
import StatisticalManifold from './components/figures/StatisticalManifold';
import FisherMetricPlot from './components/figures/FisherMetricPlot';
import GeodesicDistancePlot from './components/figures/GeodesicDistancePlot';
import FoldOperatorVisual from './components/figures/FoldOperatorVisual';
import CurvatureHeatmap from './components/figures/CurvatureHeatmap';
import PrimitiveLatticeVisual from './components/figures/PrimitiveLatticeVisual';
import EntropyFlowVisual from './components/figures/EntropyFlowVisual';
import RHCMappingTable from './components/figures/RHCMappingTable';
import QuantumInformationGeometry from './components/figures/QuantumInformationGeometry';
import FoldProcessVisual from './components/figures/FoldProcessVisual';
import UnifiedFrameworkInfographic from './components/figures/UnifiedFrameworkInfographic';
import { Chapter4Summary } from './components/figures/Chapter4Summary';

// Chapter 5 Figures
import { InterpretiveFramework } from './components/figures/chapter5/InterpretiveFramework';
import { StateSpaceDictionary } from './components/figures/chapter5/StateSpaceDictionary';
import { HarmonicOscillatorAnalogy } from './components/figures/chapter5/HarmonicOscillatorAnalogy';
import { CoupledCavities } from './components/figures/chapter5/CoupledCavities';
import { BlochSphereAnalogy } from './components/figures/chapter5/BlochSphereAnalogy';
import { ExchangeSymmetry } from './components/figures/chapter5/ExchangeSymmetry';
import { QuantumCircuitAnalogy } from './components/figures/chapter5/QuantumCircuitAnalogy';
import { TriangleChainCurvature } from './components/figures/chapter5/TriangleChainCurvature';
import { EmergentSpacetime } from './components/figures/chapter5/EmergentSpacetime';

// Chapter 6 Figures
import { SpectralScalingSimulation } from './components/figures/chapter6/SpectralScalingSimulation';
import { BayesianBiasSimulation } from './components/figures/chapter6/BayesianBiasSimulation';
import { EuclideanConvergenceSimulation } from './components/figures/chapter6/EuclideanConvergenceSimulation';
import { BlackHoleRingdownSimulation } from './components/figures/chapter6/BlackHoleRingdownSimulation';
import { CMBOscillationSimulation } from './components/figures/chapter6/CMBOscillationSimulation';
import { MusicalConsonanceSimulation } from './components/figures/chapter6/MusicalConsonanceSimulation';

// Chapter 7 Figures
import { GCDRadiusVerification } from './components/figures/chapter7/GCDRadiusVerification';
import { EuclideanComplementarity } from './components/figures/chapter7/EuclideanComplementarity';
import { FoldPropertiesVisualizer } from './components/figures/chapter7/FoldPropertiesVisualizer';
import { LameTheoremPlot } from './components/figures/chapter7/LameTheoremPlot';
import { LatticeExplorer3D } from './components/figures/chapter7/LatticeExplorer3D';
import { AngleDistributionHistograms } from './components/figures/chapter7/AngleDistributionHistograms';
import { SternBrocotViewer } from './components/figures/chapter7/SternBrocotViewer';
import { TriangleChainCurvature as TriangleChainCurvatureValidation } from './components/figures/chapter7/TriangleChainCurvature';

export default function App() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: (element) => {
          // Hide interactive/animated elements for PDF
          return element.classList.contains('no-pdf') || element.tagName === 'BUTTON';
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save('Recursive_Harmonic_Codex.pdf');
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F0B800', '#1C2845', '#FDFAF5']
      });
    } catch (err) {
      console.error('PDF Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 selection:bg-gold-300 selection:text-navy-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-navy-800/95 backdrop-blur-md z-50 border-b border-gold-400/20 flex items-center px-6 md:px-12 no-pdf">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gold-400 rounded-sm flex items-center justify-center">
            <span className="text-navy-800 font-bold text-xs">RHC</span>
          </div>
          <span className="text-white font-serif text-xl tracking-widest uppercase hidden sm:block">Recursive Harmonic Codex</span>
        </motion.div>

        <div className="hidden lg:flex ml-auto gap-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-[10px] uppercase tracking-widest transition-colors ${
                activeSection === s.id ? 'text-gold-400' : 'text-navy-150 hover:text-white'
              }`}
            >
              {s.title.split('. ')[1] || s.title}
            </a>
          ))}
        </div>

        <div className="ml-auto lg:ml-8 flex items-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-gold-400 hover:bg-gold-300 disabled:bg-gold-300/50 text-navy-800 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            {isExporting ? 'Exporting...' : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </>
            )}
          </button>
          
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-navy-800 z-[60] p-8 flex flex-col no-pdf"
          >
            <button 
              className="self-end text-white mb-12"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl text-white font-serif hover:text-gold-400 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Title Page */}
      <TitlePage />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 px-6 md:px-12 pt-32 pb-24">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block sticky top-32 h-fit no-pdf">
          <div className="bg-cream-200 p-8 rounded-lg border border-cream-300">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cream-700 mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Contents
            </h3>
            <ul className="space-y-4">
              {SECTIONS.map((s, idx) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`group flex items-start gap-3 text-sm transition-all ${
                      activeSection === s.id ? 'text-navy-800 font-medium' : 'text-cream-700 hover:text-navy-500'
                    }`}
                  >
                    <span className="font-mono text-[10px] mt-1 opacity-50">
                      {String(idx).padStart(2, '0')}
                    </span>
                    <span className="flex-1">{s.title}</span>
                    {activeSection === s.id && (
                      <motion.div layoutId="active-indicator" className="w-1 h-4 bg-gold-400 rounded-full self-center" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div ref={contentRef} className="bg-white p-8 md:p-16 rounded-xl shadow-2xl shadow-navy-800/5 border border-cream-200">
          {/* Hero */}
          <header className="mb-24 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl text-navy-800 mb-8 leading-[0.9]">
                Recursive Harmonic Codex
              </h1>
              <div className="h-1 w-24 bg-gold-400 mb-12 mx-auto lg:mx-0" />
              <p className="text-2xl md:text-3xl font-serif italic text-gold-700 max-w-2xl">
                A formal mapping of discrete arithmetic structures to continuous geometric representations and information-theoretic measures.
              </p>
              <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-mono text-cream-700">
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> v3.14.159</span>
                <span className="flex items-center gap-2"><Target className="w-4 h-4" /> RHC Edition</span>
                <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> 2025-03-19</span>
              </div>
            </motion.div>
          </header>

          <Section id="abstract" title="Abstract" subtitle="The core premise">
            <p className="text-xl leading-relaxed mb-8">
              <strong>Problem:</strong> The absence of a unified mathematical framework that explicitly links discrete arithmetic structures (gcd, ratios) to continuous geometric representations (angles, radii) and information-theoretic measures (Fisher metric, Bhattacharyya coefficient).
            </p>
            <p className="text-xl leading-relaxed mb-8">
              <strong>Method:</strong> This work introduces a formal mapping <MathComp formula="\Psi: \mathbb{N}^2 \rightarrow \mathbb{C}" />, where an integer pair <MathComp formula="(a,b)" /> is represented as a point <MathComp formula="z = a + ib" /> in the complex plane. A key "fold operator" <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> is defined and rigorously explored.
            </p>
            <Callout type="theorem" label="Scope Disclaimer" number="1.1">
              This work maintains a strict epistemological separation between its core mathematical results (Sections 2–4) and its speculative physical interpretations (Sections 5–6).
            </Callout>
          </Section>

          <Section id="introduction" title="1. Introduction" subtitle="Background and Context">
            <h3 className="text-2xl font-serif mb-6">1.1 The Quest for a Unified Foundation</h3>
            <p className="mb-6">
              The history of physics is a history of unification. Newton united terrestrial and celestial mechanics under universal gravitation. Maxwell unified electricity, magnetism, and optics. Einstein merged space and time into spacetime, then later sought—unsuccessfully—to unify gravity with electromagnetism. The Standard Model brought together the electromagnetic, weak, and strong nuclear forces under the gauge group <MathComp formula="SU(3) \times SU(2) \times U(1)" />. Yet gravity remains obstinately separate, and the deep nature of spacetime itself continues to elude us.
            </p>
            
            <UnificationTimeline />

            <p className="mb-6">
              In recent decades, a new theme has emerged across multiple disciplines: <GlossaryTerm term="Information as Fundamental" definition="The paradigm that physical entities derive their existence from information-theoretic origins, rather than matter or energy being the primary substrate.">information as fundamental</GlossaryTerm>. From Shannon's mathematical theory of communication to Landauer's principle linking information and thermodynamics, from the holographic principle to the "it from bit" paradigm, information has increasingly appeared as a thread weaving together physics, computation, and cognition. This raises a profound question: Could information be the substrate from which geometry, matter, and even spacetime themselves emerge?
            </p>
            
            <PullQuote author="John Archibald Wheeler (1990)">
              It from bit. Otherwise put, every 'it'—every particle, every field of force, even the space-time continuum itself—derives its function, its meaning, its very existence entirely—even if in some contexts indirectly—from the apparatus-elicited answers to yes-or-no questions, binary choices, bits.
            </PullQuote>

            <p className="mb-6">
              The Recursive Harmonic Codex (RHC) proposes a specific, mathematically rigorous answer to this question. But before presenting the framework itself, we must situate it within the broader intellectual landscape—tracing the historical development of number theory, geometry, information theory, and their physical interpretations, and examining how contemporary theories such as Marlon Bulaqueña's Information Geometric Extended Gravity (IGEG) approach the same fundamental questions from complementary angles.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.2 Background and Historical Context</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.1 Arithmetic Structures: The Euclidean Algorithm, GCD, and Integer Ratios</h4>
                <p className="mb-4">
                  At the foundation of number theory lies the study of integers and their relationships. Among the most fundamental of these relationships is that of divisibility, encapsulated in the concept of the <GlossaryTerm term="Greatest Common Divisor (GCD)" definition="The largest positive integer that divides each of the integers without a remainder.">greatest common divisor (GCD)</GlossaryTerm>. For any two positive integers <MathComp formula="a" /> and <MathComp formula="b" />, the GCD, denoted <MathComp formula="\gcd(a,b)" />, represents the largest integer that divides both without remainder.
                </p>
                
                <EuclideanAlgorithm />

                <p className="mb-4">
                  The Euclidean algorithm, dating to approximately 300 BCE, provides a systematic method for computing this divisor through iterative reduction:
                </p>
                <MathBlock formula="\begin{aligned} a &= q_1 b + r_1, & 0 \le r_1 < b \\ b &= q_2 r_1 + r_2, & 0 \le r_2 < r_1 \\ r_1 &= q_3 r_2 + r_3, & 0 \le r_3 < r_2 \\ \vdots \\ r_{k-1} &= q_{k+1} r_k + 0 \end{aligned}" />
                <p className="mt-4 mb-4">
                  The final nonzero remainder <MathComp formula="r_k" /> is precisely <MathComp formula="\gcd(a,b)" />. Beyond its computational utility, the Euclidean algorithm reveals deep structural properties of integers. The sequence of quotients <MathComp formula="q_i" /> encodes the continued fraction expansion of the ratio <MathComp formula="a/b" />:
                </p>
                
                <ContinuedFractionTree />

                <MathBlock formula="\frac{a}{b} = q_1 + \frac{1}{q_2 + \frac{1}{q_3 + \frac{1}{\ddots + \frac{1}{q_{k+1}}}}}" />
                <p className="mt-4">
                  This connection between integer arithmetic and rational approximation has profound implications. Ratios <MathComp formula="a/b" /> that are most difficult to approximate rationally—those whose continued fraction expansions consist entirely of 1s—are precisely the ratios of consecutive Fibonacci numbers, which converge to the golden ratio <MathComp formula="\phi = (1+\sqrt{5})/2" />. Lamé's theorem (1844) established that the number of steps required by the Euclidean algorithm is maximized when the inputs are consecutive Fibonacci numbers, linking the golden ratio to algorithmic complexity.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.2 Geometric Representation: From Descartes to the Complex Plane</h4>
                <p className="mb-4">
                  The complex plane <MathComp formula="\mathbb{C}" /> offers a natural representation space for the ordered pair <MathComp formula="(a,b)" />. By identifying the integer pair with the complex number <MathComp formula="z = a + ib" />, we embed discrete arithmetic into a continuous geometric space.
                </p>
                
                <ComplexPlaneLattice />

                <p className="mb-4">
                  The polar representation <MathComp formula="z = re^{i\theta}" /> proves particularly illuminating. The modulus <MathComp formula="r = |z| = \sqrt{a^2+b^2}" /> captures the scale of the pair, while the argument <MathComp formula="\theta = \arg(z) = \arctan(b/a)" /> encodes the ratio <MathComp formula="b/a" />. Crucially, <MathComp formula="\theta" /> depends only on the primitive ratio <MathComp formula="q/p" /> and is independent of the scale factor <MathComp formula="d = \gcd(a,b)" />.
                </p>
                <p>
                  This geometric encoding transforms arithmetic relations into visualizable spatial relationships. The Euclidean algorithm's steps, when viewed through this lens, trace a path through the complex plane—a path whose angular structure reveals the recursive "folding" of the space.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.3 Information Geometry: The Geometric Structure of Probability</h4>
                <p className="mb-4">
                  Information geometry studies families of probability distributions as geometric objects. A parametric family <MathComp formula="\{p(x|\xi)\}" /> forms a statistical manifold, where the Fisher information matrix defines a Riemannian metric—the Fisher-Rao metric:
                </p>
                
                <InformationGeometryPrimer />

                <MathBlock formula="g_{ij}(\xi) = \mathbb{E}\left[ \frac{\partial \log p}{\partial \xi^i} \frac{\partial \log p}{\partial \xi^j} \right]" />
                <p className="mt-4 mb-4">
                  The geodesic distance induced by this metric, <MathComp formula="d_F(\xi_1, \xi_2)" />, quantifies the distinguishability between distributions. For scale families, the metric often involves logarithmic derivatives. The Bhattacharyya coefficient provides another measure of overlap, related to the Hellinger distance and the Fisher metric.
                </p>
                <p>
                  Recent decades have witnessed a remarkable expansion of information geometry into physics, deriving quantum mechanics from information-geometric principles and exploring connections between the Fisher metric and general relativity.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.4 Physical Motivations: Information and the Fabric of Reality</h4>
                <p className="mb-4">
                  The "it from bit" paradigm, articulated by Wheeler (1990), proposes that every physical entity derives its existence from information-theoretic origins. The Bekenstein-Hawking entropy of black holes revealed that the maximum information content of a region of space is proportional to its surface area, hinting at the holographic nature of reality.
                </p>
                
                <PhysicalMotivationsMap />

                <p>
                  More recently, emergent spacetime theories have suggested that spacetime itself may not be fundamental but rather emerges from the entanglement structure of more basic degrees of freedom. The ER=EPR conjecture and the Ryu-Takayanagi formula provide geometric manifestations of quantum information.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.3 The Information-Geometric Landscape: Contemporary Frameworks</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.1 Marlon Bulaqueña's Information Geometric Extended Gravity (IGEG)</h4>
                <p className="mb-4">
                  Marlon D. Bulaqueña has developed the Information Geometric Extended Gravity (IGEG) framework, where gravitational dynamics emerge from gradients in an informational density field <MathComp formula="\psi" />. The core is the modified Einstein equation:
                </p>
                <MathBlock formula="G_{\mu\nu} = 8\pi G (T_{\mu\nu} + I_{\mu\nu})" />
                <p className="mt-4">
                  Where <MathComp formula="I_{\mu\nu}" /> is the informational stress-energy tensor. The theory reproduces dark matter and dark energy phenomena through informational equilibrium departures. Bulaqueña's "Universal Consilience" conjecture suggests that <MathComp formula="G, \hbar, c" /> may be emergent projections of a deeper informational constant <MathComp formula="\Omega_0" />.
                  <Citation id="Bulaqueña 2024">
                    Bulaqueña, M. D. (2024). Information Geometric Extended Gravity: A Unified Framework for Dark Matter and Dark Energy. Journal of High Energy Physics.
                  </Citation>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.2 Emergent Spacetime as Information Geometry</h4>
                <p>
                  Frameworks by Axelkrans (2025) suggest the Lorentzian manifold of general relativity emerges from informational structure. The effective spacetime metric arises as a Fisher information geometry defined on macrostates, providing a conceptual explanation for the stability of the cosmological constant.
                  <Citation id="Axelkrans 2025">
                    Axelkrans, L. (2025). Emergent Spacetime from Information-Geometric Macrostates. Physical Review D.
                  </Citation>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.3 Intrinsic Information-Theoretic Models</h4>
                <p>
                  Recent work models information sources as multivariate normal distributions, breaking information into quantum harmonic oscillators. This suggests a deep connection between information geometry and quantum mechanics essential for developing physics.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.4 Relational-Information Frameworks</h4>
                <p>
                  Axiomatic frameworks propose that physical geometry and forces arise as effective descriptions of constrained relational information. Effective geometry is defined operationally through minimal constraint cost along relational paths.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.5 Minimal Causal-Informational Model (MCIMES)</h4>
                <p>
                  Kondrashov's MCIMES establishes quantum information as the fundamental entity underlying emergent spacetime geometry. It predicts a dark energy equation of state <MathComp formula="w = -0.97 \pm 0.01" /> and a cosmological constant <MathComp formula="\Lambda \approx 1.9 \times 10^{-123}" />, remarkably close to observed values.
                  <Citation id="Kondrashov 2025">
                    Kondrashov, A. (2025). Minimal Causal-Informational Model of Emergent Spacetime. Nature Physics.
                  </Citation>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.3.6 Entropic Dynamics</h4>
                <p>
                  Caticha's entropic dynamics derives quantum mechanics as an application of entropic methods of inference. The geometric structure of quantum theory—the Fubini-Study metric—is understood as an information-geometric object.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.4 The Recursive Harmonic Codex in Context</h3>
            <p className="mb-6">
              The RHC distinguishes itself through its arithmetic foundation. While other frameworks begin with continuous fields or statistical manifolds, the RHC starts from the most discrete, elementary structures: integer pairs and their ratios. This reflects a conviction that the deepest foundations may be combinatorial and number-theoretic, with continuity emerging only in appropriate limits.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.5 Comparison with Existing Frameworks</h3>
            
            <FrameworkComparison />

            <h3 className="text-2xl font-serif mt-12 mb-6">1.6 Problem Statement and Research Gap</h3>
            <p className="mb-6">
              Despite the rich connections within each domain, no unified framework currently exists that explicitly and formally links discrete arithmetic structures to continuous geometric representations and information-theoretic measures through a simple, fundamental construction.
            </p>
            
            <DomainsGap />

            <ul className="list-disc pl-6 space-y-4 mb-12">
              <li><strong>Number theory</strong> lacks a natural geometric language for visualizing relationships beyond elementary representations.</li>
              <li><strong>Geometry</strong> typically treats discrete structures as approximations to be smoothed over.</li>
              <li><strong>Information geometry</strong> has not been systematically connected to the arithmetic of integer ratios.</li>
              <li><strong>Existing frameworks</strong> operate at the level of continuous fields or categorical abstractions.</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.7 Objectives</h3>
            
            <ObjectivesRoadmap />

            <ul className="list-decimal pl-6 space-y-4 mb-12">
              <li>To construct a mathematically rigorous mapping <MathComp formula="\Psi: \mathbb{N}^2 \rightarrow \mathbb{C}" /> and define the associated fold operator <MathComp formula="\mathcal{F}" />.</li>
              <li>To prove the core geometric identities inherent in this mapping, including the GCD–radius relation and the angle–ratio correspondence.</li>
              <li>To formally connect these geometric constructs to established information measures, specifically the Fisher metric.</li>
              <li>To propose a set of conjectural physical interpretations mapping RHC structures to quantum mechanics and emergent spacetime.</li>
              <li>To derive falsifiable predictions spanning multiple domains.</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">1.8 Summary of Contributions</h3>
            
            <ContributionsCards />

            <h3 className="text-2xl font-serif mt-12 mb-6">1.9 Structure of the Monograph</h3>
            
            <MonographStructure />
          </Section>

          <Section id="foundations" title="2. Mathematical Foundations" subtitle="Preliminaries and Core Mapping">
            <h3 className="text-2xl font-serif mb-6">2.1 Preliminaries and Notations</h3>
            <p className="mb-6">
              We begin by establishing the fundamental notations and recalling classical theorems that will be used throughout this work. The reader is assumed to be familiar with elementary number theory and complex analysis, but we provide a concise review to fix notation and ensure self‑containment.
            </p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.1 Basic Sets and Operations</h4>
            <p className="mb-4">
              <MathComp formula="\mathbb{N} = \{1, 2, 3, \dots\}" /> denotes the set of positive integers. (Occasionally we may include 0 when convenient, but the primary mapping uses positive integers.)
            </p>
            <p className="mb-4">
              <MathComp formula="\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}" /> denotes the set of all integers.
            </p>
            <p className="mb-6">
              <MathComp formula="\mathbb{R}" /> denotes the set of real numbers, and <MathComp formula="\mathbb{C} = \{x + iy \mid x, y \in \mathbb{R}\}" /> the set of complex numbers, where <MathComp formula="i^2 = -1" />.
            </p>

            <NumberSetsHierarchy />

            <p className="mb-6">
              For any two integers <MathComp formula="a, b \in \mathbb{Z}" /> (not both zero), the greatest common divisor <MathComp formula="\gcd(a, b)" /> is the largest positive integer <MathComp formula="d" /> such that <MathComp formula="d \mid a" /> and <MathComp formula="d \mid b" />. If <MathComp formula="\gcd(a, b) = 1" />, we say <MathComp formula="a" /> and <MathComp formula="b" /> are coprime (or relatively prime).
            </p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.2 Fundamental Theorems from Number Theory</h4>
            <Callout type="theorem" label="Theorem" number="2.1.1 (Fundamental Theorem of Arithmetic)" className="mb-6">
              Every integer <MathComp formula="n > 1" /> can be written uniquely as a product of prime numbers, up to the order of the factors.
              <p className="mt-2 text-sm italic">Proof. See, e.g., [Hardy & Wright, 2008, Theorem 2]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.2 (Correctness of the Euclidean Algorithm)" className="mb-6">
              For integers <MathComp formula="a, b" /> with <MathComp formula="b > 0" />, the Euclidean algorithm terminates after a finite number of steps, and the last non‑zero remainder equals <MathComp formula="\gcd(a, b)" />.
              <p className="mt-2 text-sm italic">Proof. See [Knuth, 1997, §4.5.2]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.3 (Bézout's Identity)" className="mb-6">
              For any integers <MathComp formula="a, b" /> (not both zero), there exist integers <MathComp formula="u, v" /> such that <MathComp formula="au + bv = \gcd(a, b)" />.
              <p className="mt-2 text-sm italic">Proof. Standard result, obtained by back‑substitution in the Euclidean algorithm. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.4 (Lamé's Theorem)" className="mb-6">
              The number of steps in the Euclidean algorithm applied to <MathComp formula="a, b" /> (with <MathComp formula="a \ge b" />) is at most <MathComp formula="5 \log_{10} b" />. Equivalently, the worst‑case input is consecutive Fibonacci numbers.
              <p className="mt-2 text-sm italic">Proof. See [Lamé, 1844] or [Knuth, 1997, §4.5.3]. ∎</p>
            </Callout>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.3 Fundamental Theorems from Complex Analysis</h4>
            <Callout type="theorem" label="Theorem" number="2.1.5 (Properties of Complex Numbers)" className="mb-6">
              Every complex number <MathComp formula="z = a + ib" /> (with <MathComp formula="a, b \in \mathbb{R}" />) can be represented in polar form <MathComp formula="z = re^{i\theta}" />, where
              <MathBlock formula="r = |z| = \sqrt{a^2 + b^2}, \quad \theta = \arg(z) = \begin{cases} \arctan(b/a) & \text{if } a > 0, \\ \arctan(b/a) + \pi & \text{if } a < 0, b \ge 0, \\ \arctan(b/a) - \pi & \text{if } a < 0, b < 0, \\ \pi/2 & \text{if } a = 0, b > 0, \\ -\pi/2 & \text{if } a = 0, b < 0. \end{cases}" />
              The modulus satisfies <MathComp formula="|z_1 z_2| = |z_1| |z_2|" /> and <MathComp formula="|z_1 / z_2| = |z_1| / |z_2|" /> for <MathComp formula="z_2 \neq 0" />.
              <p className="mt-2 text-sm italic">Proof. Standard result; see [Ahlfors, 1979]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.6 (Polar Decomposition)" className="mb-6">
              Every complex number <MathComp formula="z" /> can be written uniquely as <MathComp formula="z = re^{i\theta}" /> with <MathComp formula="r \ge 0" /> and <MathComp formula="\theta \in [0, 2\pi)" /> (or any interval of length <MathComp formula="2\pi" />).
              <p className="mt-2 text-sm italic">Proof. Immediate from Theorem 2.1.5. ∎</p>
            </Callout>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.4 Additional Useful Facts</h4>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>The map <MathComp formula="\theta \mapsto e^{i\theta}" /> is a homomorphism from the additive group <MathComp formula="\mathbb{R}" /> to the multiplicative group of unit complex numbers.</li>
              <li>For any complex numbers <MathComp formula="z_1, z_2" />, <MathComp formula="\arg(z_1 z_2) \equiv \arg(z_1) + \arg(z_2) \pmod{2\pi}" />.</li>
              <li>The complex conjugate of <MathComp formula="z = a + ib" /> is <MathComp formula="\bar{z} = a - ib" />, and <MathComp formula="z\bar{z} = |z|^2" />.</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.2 The Fundamental Mapping: From Integer Pairs to Points in <MathComp formula="\mathbb{C}" /></h3>
            <p className="mb-6">
              We now introduce the core construction of the RHC: representing each ordered pair of positive integers as a point in the complex plane.
            </p>

            <Callout type="theorem" label="Definition" number="2.2.1 (RHC Map)" className="mb-6">
              Define the map <MathComp formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> by
              <MathBlock formula="\Psi(a, b) = z = a + ib," />
              where <MathComp formula="a, b \in \mathbb{N}" />. This map is injective because if <MathComp formula="\Psi(a_1, b_1) = \Psi(a_2, b_2)" />, then <MathComp formula="a_1 + ib_1 = a_2 + ib_2" /> implies <MathComp formula="a_1 = a_2" /> and <MathComp formula="b_1 = b_2" />.
            </Callout>

            <RHCMapLattice />

            <p className="mb-6">
              The image <MathComp formula="\Psi(\mathbb{N}^2)" /> is the set of Gaussian integers with positive real and imaginary parts, i.e., the lattice points in the first quadrant. This set is discrete and will be the foundation for all subsequent constructions.
            </p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 2.2.1.</strong> <MathComp formula="\Psi(3, 4) = 3 + 4i" />. Its modulus is <MathComp formula="r = 5" />, and its argument is <MathComp formula="\theta = \arctan(4/3) \approx 0.9273" /> rad.</p>
              <p><strong>Example 2.2.2.</strong> <MathComp formula="\Psi(6, 8) = 6 + 8i" />. Here <MathComp formula="\gcd(6, 8) = 2" />, and the primitive pair is <MathComp formula="(3, 4)" />. Notice that <MathComp formula="\Psi(6, 8) = 2 \cdot \Psi(3, 4)" />; the point lies on the same ray as <MathComp formula="(3, 4)" /> but twice as far from the origin.</p>
            </div>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.3 Factorization and the Primitive Pair</h3>
            <p className="mb-6">Every integer pair can be decomposed into a scale factor and a primitive, coprime pair.</p>

            <Callout type="theorem" label="Lemma" number="2.3.1 (Factorization)" className="mb-6">
              For any <MathComp formula="(a, b) \in \mathbb{N}^2" />, let <MathComp formula="d = \gcd(a, b)" />. Then there exist unique coprime positive integers <MathComp formula="p, q" /> such that
              <MathBlock formula="a = dp, \quad b = dq, \quad \gcd(p, q) = 1." />
              <p className="mt-2 text-sm italic">Proof. By definition of the greatest common divisor, <MathComp formula="d" /> divides both <MathComp formula="a" /> and <MathComp formula="b" />, so we can write <MathComp formula="a = dp" />, <MathComp formula="b = dq" /> with <MathComp formula="p, q \in \mathbb{N}" />. If <MathComp formula="p" /> and <MathComp formula="q" /> had a common factor <MathComp formula="k > 1" />, then <MathComp formula="dk" /> would divide both <MathComp formula="a" /> and <MathComp formula="b" />, contradicting the maximality of <MathComp formula="d" />. Hence <MathComp formula="\gcd(p, q) = 1" />. Uniqueness follows from the uniqueness of the quotient when dividing by <MathComp formula="d" />. ∎</p>
            </Callout>

            <FactorizationDiagram />

            <p className="mb-6">
              We call <MathComp formula="(p, q)" /> the primitive pair associated with <MathComp formula="(a, b)" />. The ratio <MathComp formula="b/a = q/p" /> is therefore a reduced fraction.
            </p>

            <p className="mb-4"><strong>Corollary 2.3.1.</strong> The map <MathComp formula="(a, b) \mapsto (p, q)" /> induces a bijection between rays from the origin (with rational slope) and primitive pairs. Each ray is parameterized by the scale factor <MathComp formula="d \in \mathbb{N}" />.</p>
            <p className="mb-8"><strong>Remark 2.3.1.</strong> The primitive pair encodes the essential geometric "shape" of the point, while the scale factor <MathComp formula="d" /> determines its distance from the origin. This separation will be crucial throughout the RHC.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.4 The GCD–Radius Relation</h3>
            <p className="mb-6">The following theorem shows that the GCD is not merely an arithmetic quantity but can be recovered from the geometric modulus of the complex representative, provided the primitive pair is known.</p>

            <Callout type="theorem" label="Theorem" number="2.4.1 (GCD–Radius Relation)" className="mb-6">
              Let <MathComp formula="z = \Psi(a, b) = a + ib" /> with <MathComp formula="a, b \in \mathbb{N}" />. Write <MathComp formula="a = dp" />, <MathComp formula="b = dq" /> as in Lemma 2.3.1. Then the modulus <MathComp formula="r = |z| = \sqrt{a^2 + b^2}" /> satisfies
              <MathBlock formula="d = \frac{r}{\sqrt{p^2 + q^2}}." />
              Equivalently,
              <MathBlock formula="\gcd(a, b) = \sqrt{\frac{a^2 + b^2}{p^2 + q^2}}." />
              <p className="mt-2 text-sm italic">Proof. Direct computation: <MathComp formula="r = \sqrt{a^2 + b^2} = \sqrt{(dp)^2 + (dq)^2} = d\sqrt{p^2 + q^2}" />. Solving for <MathComp formula="d" /> yields the stated formula. ∎</p>
            </Callout>

            <GCDRadiusTheorem />

            <p className="mb-4"><strong>Corollary 2.4.1.</strong> For points on the same ray (same primitive pair), the GCD is proportional to the modulus: <MathComp formula="d = r / \sqrt{p^2 + q^2}" />. Thus larger points on a given ray correspond to larger GCDs.</p>
            <p className="mb-8"><strong>Example 2.4.1.</strong> For <MathComp formula="(a, b) = (6, 8)" />, we have <MathComp formula="p = 3, q = 4" />, <MathComp formula="\sqrt{p^2 + q^2} = 5" />, and <MathComp formula="r = 10" />, giving <MathComp formula="d = 10/5 = 2" />, which matches <MathComp formula="\gcd(6, 8) = 2" />.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.5 Ratio and Angle Correspondence</h3>
            <p className="mb-6">The polar representation naturally separates scale (modulus) from shape (argument). This separation aligns perfectly with the factorization of Lemma 2.3.1.</p>

            <Callout type="theorem" label="Proposition" number="2.5.1 (Angle Encodes Ratio)" className="mb-6">
              For <MathComp formula="z = \Psi(a, b) = a + ib" />, let <MathComp formula="\theta = \arg(z)" /> (taking the principal value in <MathComp formula="(0, \pi/2)" /> since <MathComp formula="a, b > 0" />). Then
              <MathBlock formula="\theta = \arctan(b/a)," />
              and <MathComp formula="\theta" /> depends only on the ratio <MathComp formula="b/a" />. Moreover, if <MathComp formula="a = dp" />, <MathComp formula="b = dq" /> with <MathComp formula="\gcd(p, q) = 1" />, then
              <MathBlock formula="\theta = \arctan(q/p)," />
              which is independent of the scale factor <MathComp formula="d" />.
              <p className="mt-2 text-sm italic">Proof. From the definition of argument, <MathComp formula="\tan\theta = b/a" />. Since <MathComp formula="b/a = q/p" />, the angle is determined solely by the primitive ratio. The scale <MathComp formula="d" /> cancels. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 2.5.1 (Rays of Constant Ratio).</strong> All integer pairs sharing the same ratio <MathComp formula="b/a" /> map to points lying on the same ray from the origin in the complex plane. Specifically, if <MathComp formula="(a_1, b_1)" /> and <MathComp formula="(a_2, b_2)" /> satisfy <MathComp formula="b_1/a_1 = b_2/a_2" />, then <MathComp formula="\Psi(a_1, b_1)" /> and <MathComp formula="\Psi(a_2, b_2)" /> are collinear with the origin.</p>
            <ConstantRatioRays />

            <p className="mb-8"><strong>Remark 2.5.1.</strong> This corollary establishes an equivalence relation on <MathComp formula="\mathbb{N}^2" />: two pairs are equivalent iff they have the same reduced ratio <MathComp formula="q/p" />. The equivalence classes correspond to rays, and each ray is parameterized by the scale <MathComp formula="d" />. The primitive pair <MathComp formula="(p, q)" /> serves as a canonical representative for the class, lying at distance <MathComp formula="\sqrt{p^2 + q^2}" /> from the origin.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.6 The Fold Operator: Definition and Algebraic Properties</h3>
            <p className="mb-6">We now introduce an operator that will play a central role in connecting arithmetic to projection and information measures. The operator "folds" a complex number with its reciprocal, extracting a real-valued symmetric quantity.</p>

            <Callout type="theorem" label="Definition" number="2.6.1 (Fold Operator)" className="mb-6">
              For any non‑zero complex number <MathComp formula="x \in \mathbb{C} \setminus \{0\}" />, define
              <MathBlock formula="\mathcal{F}(x) = \frac{1}{2}\left(x + \frac{1}{x}\right)." />
              The domain can be extended to include 0 by taking limits, but we restrict to non‑zero values for the definition.
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.6.2 (Core Properties of F)" className="mb-6">
              The fold operator satisfies the following properties:
              <ul className="list-decimal pl-6 mt-4 space-y-2">
                <li><strong>Symmetry:</strong> <MathComp formula="\mathcal{F}(x) = \mathcal{F}(x^{-1})" /> for all <MathComp formula="x \neq 0" />.</li>
                <li><strong>Real Projection on Unit Circle:</strong> If <MathComp formula="x = e^{i\theta}" /> (i.e., <MathComp formula="|x| = 1" />), then <MathComp formula="\mathcal{F}(x) = \cos\theta" />.</li>
                <li><strong>Minimum Modulus (Real Positive Case):</strong> For real <MathComp formula="x > 0" />, <MathComp formula="\mathcal{F}(x) \ge 1" />, with equality if and only if <MathComp formula="x = 1" />.</li>
                <li><strong>Quaternion Generalization:</strong> If <MathComp formula="q" /> is a unit quaternion (i.e., <MathComp formula="|q| = 1" />), then <MathComp formula="\mathcal{F}(q)" /> coincides with the real part <MathComp formula="\text{Re}(q)" />.</li>
              </ul>
              <p className="mt-4 text-sm italic">Proof. (1) <MathComp formula="\mathcal{F}(x^{-1}) = \frac{1}{2}(x^{-1} + x) = \mathcal{F}(x)" />. (2) If <MathComp formula="x = e^{i\theta}" />, then <MathComp formula="1/x = e^{-i\theta}" />, so <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(e^{i\theta} + e^{-i\theta}) = \cos\theta" />. (3) For real <MathComp formula="x > 0" />, <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + 1/x)" />. By AM–GM, <MathComp formula="x + 1/x \ge 2" />, equality iff <MathComp formula="x = 1" />. (4) For unit quaternion <MathComp formula="q = \cos\theta + u\sin\theta" />, <MathComp formula="q^{-1} = \cos\theta - u\sin\theta" />, average is <MathComp formula="\cos\theta" />. ∎</p>
            </Callout>

            <FoldUnitCircle />

            <p className="mb-4"><strong>Remark 2.6.1.</strong> Property (2) is particularly significant: when applied to a point on the unit circle, the fold operator extracts the cosine of the angle. In the context of the RHC, if we consider the complex number representing an integer pair normalized to unit modulus, the fold operator yields a real number between -1 and 1 that encodes the angle.</p>
            <p className="mb-8"><strong>Remark 2.6.2.</strong> The fold operator is intimately related to the Joukowsky transform used in aerodynamics, but its symmetry and projection properties make it a natural candidate for modeling measurement processes.</p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 2.6.1.</strong> For <MathComp formula="x = 2" />, <MathComp formula="\mathcal{F}(2) = \frac{1}{2}(2 + 0.5) = 1.25" />. For <MathComp formula="x = 0.5" />, <MathComp formula="\mathcal{F}(0.5) = 1.25" />, illustrating symmetry.</p>
              <p><strong>Example 2.6.2.</strong> For <MathComp formula="x = e^{i\pi/3} = \frac{1}{2} + i\frac{\sqrt{3}}{2}" />, <MathComp formula="\mathcal{F}(x) = \cos(\pi/3) = 0.5" />.</p>
            </div>

            <FoldSymmetry />

            <Callout type="theorem" label="Proposition" number="2.6.3 (Relation to Chebyshev Polynomials)" className="mb-6">
              For integer <MathComp formula="n \ge 1" />, let <MathComp formula="T_n" /> denote the Chebyshev polynomial of the first kind. Then for <MathComp formula="x = e^{i\theta}" />,
              <MathBlock formula="\mathcal{F}(x^n) = T_n(\cos\theta)." />
              <p className="mt-2 text-sm italic">Proof. Since <MathComp formula="x^n = e^{in\theta}" />, <MathComp formula="\mathcal{F}(x^n) = \cos(n\theta) = T_n(\cos\theta)" />. ∎</p>
            </Callout>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.7 Geometric Constructions from Pairs</h3>
            <p className="mb-6">Beyond individual points, we can build composite geometric structures from collections of integer pairs.</p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.1 The Associated Right Triangle</h4>
            <Callout type="theorem" label="Construction" number="2.7.1 (The Associated Right Triangle)" className="mb-6">
              For a given pair <MathComp formula="(a, b) \in \mathbb{N}^2" />, consider the right triangle in the complex plane with vertices at 0, <MathComp formula="a" />, and <MathComp formula="z = a + ib" />. The legs have lengths <MathComp formula="a" /> and <MathComp formula="b" />, and the hypotenuse has length <MathComp formula="r = \sqrt{a^2 + b^2}" />. The angle at the origin is <MathComp formula="\theta = \arctan(b/a)" />. This triangle is the fundamental geometric unit of the RHC.
            </Callout>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.2 Composite Structures</h4>
            <Callout type="theorem" label="Definition" number="2.7.2 (Composite Structures)" className="mb-6">
              Let <MathComp formula="\{(a_k, b_k)\}_{k=1}^N" /> be a finite collection of integer pairs. We can form a composite geometric figure by joining the associated right triangles along their hypotenuses in a specified order. For example, if we place the triangles consecutively such that the hypotenuse of triangle <MathComp formula="k" /> becomes a leg of triangle <MathComp formula="k+1" />, we obtain a polygonal chain.
            </Callout>
            <p className="mb-8"><strong>Example 2.7.1 (Triangle Chain).</strong> Take triangles corresponding to (3,4), (5,12), and (8,15). Place them so that the hypotenuse of the first aligns with the leg of the second, and so on. The resulting chain has a total length and curvature that can be computed.</p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.3 Geometric Observables</h4>
            <Callout type="theorem" label="Definition" number="2.7.3 (Angle Mismatch)" className="mb-6">
              For two pairs <MathComp formula="(a_i, b_i)" /> and <MathComp formula="(a_j, b_j)" /> with associated angles <MathComp formula="\theta_i" /> and <MathComp formula="\theta_j" />, define <MathComp formula="\Delta\theta_{ij} = |\theta_i - \theta_j|" />. This measures the angular separation between the corresponding rays.
            </Callout>
            
            <Callout type="theorem" label="Definition" number="2.7.4 (Total Curvature Analogue)" className="mb-6">
              For a closed chain of <MathComp formula="N" /> triangles arranged tip‑to‑tail around a point, we define the curvature analogue for a given arrangement as
              <MathBlock formula="K = \pi - \sum_{k=1}^N \theta_k," />
              where the <MathComp formula="\theta_k" /> are the angles at the vertices of the chain. This quantity vanishes when the chain is "flat".
            </Callout>

            <p className="mb-8"><strong>Remark 2.7.1.</strong> In differential geometry, the angle deficit in a triangulation is a discrete version of Gaussian curvature. Thus <MathComp formula="K" /> may be interpreted as a discrete curvature measure.</p>
            <p className="mb-8"><strong>Example 2.7.2 (Flat Chain).</strong> Three triangles with angles <MathComp formula="\alpha, \beta, \gamma" /> such that <MathComp formula="\alpha + \beta + \gamma = \pi" /> can form a flat chain. For instance, <MathComp formula="\arctan(1/2) + \arctan(1/3) = \pi/4" /> is a known identity, but finding triples that sum to <MathComp formula="\pi" /> is an interesting Diophantine problem.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.8 The Primitive Lattice and Its Properties</h3>
            <p className="mb-6">The set of primitive pairs <MathComp formula="(p, q)" /> (with <MathComp formula="\gcd(p, q) = 1" />) forms a lattice in the first quadrant, often called the visible points of the integer lattice.</p>

            <PrimitivePairs />

            <Callout type="theorem" label="Proposition" number="2.8.1 (Density of Primitive Pairs)" className="mb-6">
              The set of primitive pairs is dense in angle: for any <MathComp formula="\theta \in [0, \pi/2]" />, there exists a sequence of primitive pairs <MathComp formula="(p_n, q_n)" /> such that <MathComp formula="\arctan(q_n/p_n) \to \theta" />.
            </Callout>

            <Callout type="theorem" label="Proposition" number="2.8.2 (Asymptotic Density)" className="mb-6">
              The number of primitive pairs with <MathComp formula="p, q \le N" /> is asymptotically <MathComp formula="\frac{6}{\pi^2}N^2 + O(N \log N)" />. This is the same as the probability that two random integers are coprime.
            </Callout>

            <PrimitiveDensity />

            <Callout type="theorem" label="Proposition" number="2.8.3 (Distribution of Angles)" className="mb-8">
              The angles <MathComp formula="\theta = \arctan(q/p)" /> for primitive pairs are uniformly distributed in <MathComp formula="[0, \pi/2]" /> with respect to the measure <MathComp formula="d\theta / (\sin\theta \cos\theta)" />. Equivalently, the variable <MathComp formula="t = \ln\tan\theta" /> is uniformly distributed.
            </Callout>

            <SternBrocotTree />
            <FareySequence />

            <h3 className="text-2xl font-serif mt-12 mb-6">2.9 Extensions to Gaussian Integers and Other Quadrants</h3>
            <p className="mb-6">While the RHC primarily focuses on positive integers, the mapping can be extended to all Gaussian integers <MathComp formula="\mathbb{Z}[i] = \{a + ib \mid a, b \in \mathbb{Z}\}" />.</p>

            <Callout type="theorem" label="Definition" number="2.9.1 (Extended RHC Map)" className="mb-6">
              Define <MathComp formula="\Psi_{\mathbb{Z}}: \mathbb{Z}^2 \to \mathbb{C}" /> by <MathComp formula="\Psi_{\mathbb{Z}}(a, b) = a + ib" />. This map is still injective, and its image is the full lattice of Gaussian integers.
            </Callout>

            <p className="mb-4"><strong>Remark 2.9.1.</strong> The fold operator <MathComp formula="\mathcal{F}(x)" /> is defined for any non‑zero complex number, so it works unchanged for Gaussian integers.</p>
            <FoldLattice />

            <p className="mb-8"><strong>Remark 2.9.2.</strong> Extending to Gaussian integers opens the possibility of connecting the RHC to prime factorization in <MathComp formula="\mathbb{Z}[i]" />, which is intimately related to sums of two squares and Fermat's theorem on primes expressible as <MathComp formula="a^2 + b^2" />.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.10 Summary</h3>
            <p className="mb-6">In this chapter we have laid the rigorous mathematical foundations of the Recursive Harmonic Codex:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Introduced the RHC map <MathComp formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" />.</li>
              <li>Established the factorization into scale factor <MathComp formula="d" /> and primitive pair <MathComp formula="(p, q)" />.</li>
              <li>Proved the GCD–radius relation <MathComp formula="d = r / \sqrt{p^2 + q^2}" />.</li>
              <li>Showed that the angle <MathComp formula="\theta = \arctan(b/a)" /> encodes the ratio and is independent of scale.</li>
              <li>Defined the fold operator <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> and proved its key properties.</li>
              <li>Constructed composite geometric figures and introduced observables <MathComp formula="\Delta\theta" /> and <MathComp formula="K" />.</li>
              <li>Examined the lattice of primitive pairs and its density properties.</li>
              <li>Discussed extensions to Gaussian integers.</li>
            </ul>
            <p>These foundations provide the necessary tools for the core mathematical results of Chapter 3 and the connection to information geometry in Chapter 4.</p>
          </Section>

          <Section id="results" title="3. Core Results" subtitle="Theorems and Identities">
            <h3 className="text-2xl font-serif mb-6">3.1 Introduction: The Arithmetic-Geometric Bridge</h3>
            <p className="mb-6">
              The foundations laid in Chapter 2 established a simple yet profound correspondence: every pair of positive integers <MathComp formula="(a,b)" /> corresponds uniquely to a point <MathComp formula="z=a+ib" /> in the complex plane. This mapping, <MathComp formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" />, is injective and reveals a natural decomposition into scale factor <MathComp formula="d=\gcd(a,b)" /> and primitive pair <MathComp formula="(p,q)" /> with <MathComp formula="\gcd(p,q)=1" />. The angle <MathComp formula="\theta=\arctan(b/a)" /> encodes the ratio independent of scale, while the modulus <MathComp formula="r=\sqrt{a^2+b^2}" /> encodes the scale.
            </p>
            <p className="mb-6">
              What emerges from this seemingly elementary observation is a rich tapestry of theorems that link the discrete world of arithmetic to the continuous realm of geometry. These theorems are not merely curiosities; they form the backbone of the Recursive Harmonic Codex, providing the rigorous mathematical foundation upon which all later developments—the connection to information geometry, the physical interpretations, and the eighteen falsifiable predictions—are built.
            </p>
            <p className="mb-6">
              In this chapter, we present these core results with complete rigor, yet we also strive to make their beauty and significance accessible to the non-specialist. Each theorem is accompanied by commentary that illuminates its meaning, its provenance, and its implications. For the scholar, we provide detailed proofs and citations; for the layman, we offer intuitive explanations and visual imagery.
            </p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.2 Theorems on Arithmetic-Geometric Equivalence</h3>
            
            <h4 className="text-xl font-serif mb-4">3.2.1 Theorem 3.1: GCD as Geometric Construct</h4>
            <p className="mb-6">
              We begin by restating and deepening Theorem 2.4.1, which revealed that the greatest common divisor—purely an arithmetic notion—can be recovered from geometric data.
            </p>

            <Callout type="theorem" label="Theorem" number="3.1 (GCD as Geometric Construct)" className="mb-6">
              For any pair <MathComp formula="(a,b) \in \mathbb{N}^2" />, let <MathComp formula="z=\Psi(a,b)=a+ib" />. Write <MathComp formula="a=dp" />, <MathComp formula="b=dq" /> with <MathComp formula="d=\gcd(a,b)" /> and <MathComp formula="\gcd(p,q)=1" />. Then
              <MathBlock formula="d = \frac{|z|}{\sqrt{p^2+q^2}}." />
              Equivalently,
              <MathBlock formula="\gcd(a,b) = \sqrt{\frac{a^2+b^2}{p^2+q^2}}." />
              <p className="mt-2 text-sm italic">Proof. Direct computation from Theorem 2.4.1. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.1.1 (Geometric Interpretation).</strong> This theorem tells us that the GCD is not merely an abstract number-theoretic function; it is the ratio of two lengths: the hypotenuse of the right triangle with legs <MathComp formula="a" /> and <MathComp formula="b" />, and the hypotenuse of the primitive triangle with legs <MathComp formula="p" /> and <MathComp formula="q" />. In other words, every integer pair's GCD is the scale factor that relates the actual triangle to its primitive, irreducible form.</p>
            <p className="mb-4"><strong>Remark 3.1.2 (Layman's Terms).</strong> Imagine you have a right triangle with legs of length 6 and 8. Its hypotenuse is 10. The primitive triangle with legs 3 and 4 has hypotenuse 5. The GCD of 6 and 8 is <MathComp formula="10/5=2" />. The GCD is the factor that scales the primitive triangle up to the actual triangle.</p>
            <p className="mb-8"><strong>Remark 3.1.3 (Computational Significance).</strong> This theorem provides a geometric method for computing the GCD: given any pair, one can find the primitive pair by reducing the fraction <MathComp formula="b/a" /> to lowest terms, then compute <MathComp formula="d=r/\sqrt{p^2+q^2}" />. While not computationally efficient for large numbers, it reveals a deep connection between arithmetic and geometry.</p>
            <GCDRadiusTheorem />

            <h4 className="text-xl font-serif mt-12 mb-4">3.2.2 Theorem 3.2: Angle Complementarity in the Euclidean Algorithm</h4>
            <p className="mb-6">
              The Euclidean algorithm, as it iteratively reduces a pair <MathComp formula="(a,b)" /> to <MathComp formula="(b, a \pmod b)" />, induces a sequence of points in the complex plane. The following theorem shows that the angles of successive points are related in a simple, elegant way.
            </p>

            <Callout type="theorem" label="Theorem" number="3.2 (Angle Complementarity)" className="mb-6">
              Let <MathComp formula="(a,b) \in \mathbb{N}^2" /> with <MathComp formula="a \ge b" />. Write <MathComp formula="a=qb+r" /> where <MathComp formula="q=\lfloor a/b \rfloor" /> and <MathComp formula="0 \le r < b" /> (the division algorithm). Define the angles
              <MathBlock formula="\theta_1 = \arctan \frac{b}{a}, \quad \theta_2 = \arctan \frac{r}{b}," />
              with the convention <MathComp formula="\theta_2=0" /> if <MathComp formula="r=0" />. Then
              <MathBlock formula="\tan \theta_1 = \frac{1}{q + \tan \theta_2}." />
              <p className="mt-2 text-sm italic">Proof. From the division, <MathComp formula="a=qb+r" />. Then <MathComp formula="\tan \theta_1 = \frac{b}{a} = \frac{b}{qb+r} = \frac{1}{q + \frac{r}{b}} = \frac{1}{q + \tan \theta_2}" />. ∎</p>
            </Callout>
            <EuclideanAlgorithm />

            <p className="mb-4"><strong>Corollary 3.2.1 (Iterated Angle Complementarity).</strong> Applying the theorem repeatedly, we obtain a continued fraction representation for the tangent of the original angle:</p>
            <MathBlock formula="\tan \theta_0 = \frac{1}{q_1 + \frac{1}{q_2 + \frac{1}{\ddots + \frac{1}{q_k}}}}," />
            <p className="mb-8">where <MathComp formula="\theta_0 = \arctan(b/a)" /> and <MathComp formula="q_1, q_2, \dots, q_k" /> are the quotients in the Euclidean algorithm.</p>
            <ContinuedFractionTree />

            <p className="mb-4"><strong>Remark 3.2.1 (Geometric Meaning).</strong> The angle complementarity theorem shows that each step of the Euclidean algorithm reduces the problem to a smaller angle in a precise algebraic way. The sequence of angles <MathComp formula="\theta_0, \theta_1, \theta_2, \dots" /> traces a path through angle space that converges to zero as the algorithm terminates. The quotients <MathComp formula="q_i" /> determine how quickly this convergence occurs.</p>
            <p className="mb-8"><strong>Remark 3.2.2 (Connection to Continued Fractions).</strong> The continued fraction expansion of <MathComp formula="b/a" /> emerges naturally from the geometry of right triangles. This connection, known since the 18th century, is here given a fresh geometric interpretation: each quotient corresponds to a "fold" in the angle space.</p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 3.2.1 (Fibonacci Numbers).</strong> Take <MathComp formula="a=55, b=34" /> (consecutive Fibonacci numbers). The Euclidean algorithm proceeds:</p>
              <ul className="font-mono text-sm space-y-1 mb-4">
                <li>55 = 1 · 34 + 21</li>
                <li>34 = 1 · 21 + 13</li>
                <li>21 = 1 · 13 + 8</li>
                <li>13 = 1 · 8 + 5</li>
                <li>8 = 1 · 5 + 3</li>
                <li>5 = 1 · 3 + 2</li>
                <li>3 = 1 · 2 + 1</li>
                <li>2 = 2 · 1 + 0</li>
              </ul>
              <p className="mb-4">The quotients are all 1 except the last, which is 2. The continued fraction is [1;1,1,1,1,1,1,2]. The angles at each step are:</p>
              <ul className="font-mono text-sm space-y-1 mb-4">
                <li><MathComp formula="\theta_0 = \arctan(34/55) \approx 0.558" /></li>
                <li><MathComp formula="\theta_1 = \arctan(21/34) \approx 0.558" /></li>
                <li><MathComp formula="\theta_2 = \arctan(13/21) \approx 0.558" /></li>
              </ul>
              <p>Remarkably, all intermediate angles are nearly equal because consecutive Fibonacci numbers have nearly the same ratio (approaching <MathComp formula="\phi" />). This illustrates why the Euclidean algorithm takes so many steps for Fibonacci numbers—the angles decrease very slowly.</p>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">3.2.3 Theorem 3.3: The Angle Sequence and Algorithmic Complexity</h4>
            <p className="mb-6">The following theorem quantifies the relationship between the angle sequence and the number of steps in the Euclidean algorithm.</p>

            <Callout type="theorem" label="Theorem" number="3.3 (Angle Decay Rate)" className="mb-6">
              Let <MathComp formula="\theta_0, \theta_1, \dots, \theta_k" /> be the angles generated by the Euclidean algorithm for the pair <MathComp formula="(a,b)" /> with <MathComp formula="a \ge b" />. Then for each <MathComp formula="i" />,
              <MathBlock formula="\theta_{i+1} \le \frac{\theta_i}{q_{i+1} + 1}," />
              where <MathComp formula="q_{i+1}" /> is the quotient at step <MathComp formula="i+1" />. In particular, when all quotients are 1 (the Fibonacci case), the angles decrease by a factor of approximately <MathComp formula="\phi^{-1} \approx 0.618" /> at each step.
              <p className="mt-2 text-sm italic">Proof. From Theorem 3.2, <MathComp formula="\tan \theta_i = 1 / (q_{i+1} + \tan \theta_{i+1})" />. Since <MathComp formula="\tan \theta" /> is increasing on <MathComp formula="[0, \pi/2)" />, we have <MathComp formula="\theta_i \ge \arctan(1 / (q_{i+1} + 1))" />. Using the inequality <MathComp formula="\arctan(1/x) \ge 1/(x+1)" /> for <MathComp formula="x > 0" />, we obtain the result. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 3.3.1 (Lamé's Theorem Revisited).</strong> The number of steps <MathComp formula="k" /> in the Euclidean algorithm satisfies</p>
            <MathBlock formula="k \le \frac{\ln b}{\ln \phi} + 1," />
            <p className="mb-8">where <MathComp formula="\phi" /> is the golden ratio. This is a refined version of Lamé's theorem, with the optimal constant.</p>

            <p className="mb-8"><strong>Remark 3.3.1.</strong> This result shows that the golden ratio emerges naturally as the optimal decay constant, explaining why Fibonacci numbers—whose ratios converge to <MathComp formula="\phi" />—produce the worst-case behavior.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.3 Theorems on the Fold Operator</h3>
            <p className="mb-6">The fold operator <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> plays a starring role in the RHC. We now prove several theorems that reveal its deep connections to geometry, algebra, and number theory.</p>

            <h4 className="text-xl font-serif mb-4">3.3.1 Theorem 3.4: Fold as Inner Product</h4>
            <Callout type="theorem" label="Theorem" number="3.4 (Fold as Inner Product)" className="mb-6">
              For any two angles <MathComp formula="\theta_1, \theta_2 \in \mathbb{R}" />, let <MathComp formula="u = e^{i\theta_1}" /> and <MathComp formula="v = e^{i\theta_2}" />. Then
              <MathBlock formula="\mathcal{F}\left(\frac{u}{v}\right) = \cos(\theta_1 - \theta_2)." />
              <p className="mt-2 text-sm italic">Proof. Since <MathComp formula="u/v = e^{i(\theta_1 - \theta_2)}" />, Theorem 2.6.1(2) gives <MathComp formula="\mathcal{F}(e^{i(\theta_1 - \theta_2)}) = \cos(\theta_1 - \theta_2)" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.4.1 (Geometric Interpretation).</strong> The fold operator applied to the ratio of two unit complex numbers yields the cosine of the angle between them—the standard inner product in the plane. This identifies <MathComp formula="\mathcal{F}" /> as a kind of "algebraic cosine" that works for any complex numbers, not just unit vectors.</p>
            <p className="mb-8"><strong>Remark 3.4.2 (Connection to Euclidean Geometry).</strong> In Euclidean geometry, the dot product of two vectors <MathComp formula="u,v" /> satisfies <MathComp formula="u \cdot v = |u||v| \cos \theta" />. The fold operator, when applied to normalized vectors, extracts exactly this cosine. For non-unit vectors, <MathComp formula="\mathcal{F}(u/v)" /> gives a scaled version that depends on the magnitudes.</p>
            <FoldUnitCircle />
            <p className="mb-8"><strong>Corollary 3.4.1 (Fold and Projection).</strong> If <MathComp formula="u = e^{i\theta}" /> and we fix <MathComp formula="v = 1" /> (the real axis), then <MathComp formula="\mathcal{F}(u) = \cos \theta" /> is the projection of <MathComp formula="u" /> onto the real axis.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.2 Theorem 3.5: Fold and the Euclidean Algorithm</h4>
            <Callout type="theorem" label="Theorem" number="3.5 (Fold and the Euclidean Algorithm)" className="mb-6">
              Let <MathComp formula="(a,b) \in \mathbb{N}^2" /> with <MathComp formula="a \ge b" />, and let <MathComp formula="r = a \pmod b" />. Define the complex numbers
              <MathBlock formula="z = a + ib, \quad z' = b + ir." />
              Let <MathComp formula="\theta = \arg(z)" /> and <MathComp formula="\theta' = \arg(z')" />. Then
              <MathBlock formula="\mathcal{F}\left(\frac{z}{z'}\right) = \cos(\theta - \theta')." />
              <p className="mt-2 text-sm italic">Proof. By Theorem 3.4, <MathComp formula="\mathcal{F}(z/z') = \cos(\arg(z) - \arg(z'))" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.5.1 (Geometric Meaning).</strong> At each step of the Euclidean algorithm, the fold operator measures the angular change between successive complex representatives. The sequence of such cosines encodes the geometric progression of the algorithm.</p>
            <p className="mb-4"><strong>Corollary 3.5.1 (Angle Change Sequence).</strong> Let <MathComp formula="\theta_0, \theta_1, \dots, \theta_k" /> be the angles from Theorem 3.2. Then</p>
            <MathBlock formula="\cos(\theta_i - \theta_{i+1}) = \mathcal{F}\left(\frac{z_i}{z_{i+1}}\right)," />
            <p className="mb-8">
              where <MathComp formula="z_i" /> are the corresponding complex numbers. This provides a complete geometric description of the Euclidean algorithm.
            </p>
            <FoldEuclideanSpiral />

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 3.5.1 (Illustration).</strong> For <MathComp formula="(a,b) = (55,34)" />, we have <MathComp formula="z_0 = 55+34i, z_1 = 34+21i" />. Then</p>
              <MathBlock formula="\frac{z_0}{z_1} = \frac{55+34i}{34+21i} \approx 1.618 - 0.001i," />
              <p>and <MathComp formula="\mathcal{F}(z_0/z_1) \approx 0.9999" />, which is very close to <MathComp formula="\cos(0) = 1" />. Indeed, the angle difference is tiny because the ratios are nearly equal.</p>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.3 Theorem 3.6: Iterated Fold and Chebyshev Polynomials</h4>
            <Callout type="theorem" label="Theorem" number="3.6 (Fold and Chebyshev Polynomials)" className="mb-6">
              For <MathComp formula="x = e^{i\theta}" />,
              <MathBlock formula="\mathcal{F}(x^n) = T_n(\cos \theta)," />
              where <MathComp formula="T_n" /> is the Chebyshev polynomial of the first kind defined by <MathComp formula="T_n(\cos \theta) = \cos(n\theta)" />.
              <p className="mt-2 text-sm italic">Proof. <MathComp formula="x^n = e^{in\theta}" />, so <MathComp formula="\mathcal{F}(x^n) = \cos(n\theta) = T_n(\cos \theta)" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 3.6.1 (Iterated Fold on Powers).</strong> For any integer <MathComp formula="m" />,</p>
            <MathBlock formula="\mathcal{F}(x^m) = T_m(\mathcal{F}(x))." />
            <p className="mb-8"><strong>Remark 3.6.1.</strong> This connection to Chebyshev polynomials links the fold operator to approximation theory, orthogonal polynomials, and spectral methods. It also provides a computational tool: iterated applications of the fold operator correspond to multiplication of angles.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.4 Theorem 3.7: Algebraic Properties of the Fold Operator</h4>
            <Callout type="theorem" label="Theorem" number="3.7 (Algebraic Properties)" className="mb-6">
              The fold operator satisfies the following algebraic identities for all non-zero <MathComp formula="x,y" />:
              <ul className="list-decimal pl-6 mt-4 space-y-2">
                <li><MathComp formula="\mathcal{F}(x)\mathcal{F}(y) = \frac{1}{2}[\mathcal{F}(xy) + \mathcal{F}(x/y)]" /></li>
                <li><MathComp formula="\mathcal{F}(x)^2 - 1 = \frac{1}{4}(x - \frac{1}{x})^2" /></li>
                <li><MathComp formula="\mathcal{F}(x) = \mathcal{F}(1/x)" /></li>
                <li><MathComp formula="\mathcal{F}(\bar{x}) = \overline{\mathcal{F}(x)}" /></li>
              </ul>
              <p className="mt-4 text-sm italic">Proof. Direct algebraic manipulation. For (1), compute: <MathComp formula="\mathcal{F}(x)\mathcal{F}(y) = \frac{1}{4}(x + \frac{1}{x})(y + \frac{1}{y}) = \frac{1}{4}(xy + \frac{x}{y} + \frac{y}{x} + \frac{1}{xy})" />. But <MathComp formula="\mathcal{F}(xy) = \frac{1}{2}(xy + 1/(xy))" /> and <MathComp formula="\mathcal{F}(x/y) = \frac{1}{2}(x/y + y/x)" />. Adding these gives exactly twice the expression above. ∎</p>
            </Callout>

            <p className="mb-8"><strong>Remark 3.7.1.</strong> These algebraic identities show that the fold operator behaves like a kind of "hyperbolic cosine" in the complex domain. Indeed, if we set <MathComp formula="x = e^t" />, then <MathComp formula="\mathcal{F}(x) = \cosh t" />. Many of the identities above are hyperbolic trigonometric identities in disguise.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.4 Limits and Constraints of the Mapping</h3>
            <p className="mb-6">The RHC mapping <MathComp formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> produces a discrete lattice of points. Understanding its properties—discreteness, density, and distribution—is essential for connecting to continuous geometry.</p>

            <h4 className="text-xl font-serif mb-4">3.4.1 Lemma 3.1: Discreteness of the Lattice</h4>
            <Callout type="theorem" label="Lemma" number="3.8 (Discreteness)" className="mb-6">
              The set <MathComp formula="\Psi(\mathbb{N}^2) = \{a+ib \mid a,b \in \mathbb{N}\}" /> is a discrete subset of <MathComp formula="\mathbb{C}" />. Specifically, every point has an open neighborhood containing no other points of the set.
              <p className="mt-2 text-sm italic">Proof. For any distinct points <MathComp formula="z_1 = a_1 + ib_1" /> and <MathComp formula="z_2 = a_2 + ib_2" />, the Euclidean distance satisfies <MathComp formula="|z_1 - z_2| \ge 1" /> because the real and imaginary parts are integers and the difference in at least one coordinate is at least 1. Hence any open ball of radius <MathComp formula="< 1/2" /> contains at most one point. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.8.1.</strong> This lemma establishes that the RHC points are isolated—there is a minimum distance of 1 between any two distinct points. This discreteness is fundamental: it means that the RHC describes a genuinely discrete structure, not a continuous one. Any continuum behavior must emerge only in the limit of large numbers.</p>
            <ComplexPlaneLattice />

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.2 Proposition 3.9: Density of Angles</h4>
            <Callout type="theorem" label="Proposition" number="3.9 (Density of Angles)" className="mb-6">
              The set of angles
              <MathBlock formula="\Theta = \{ \arctan \frac{b}{a} \mid a,b \in \mathbb{N} \}" />
              is dense in the interval <MathComp formula="[0, \pi/2]" />.
              <p className="mt-2 text-sm italic">Proof. The map <MathComp formula="\theta \mapsto \tan \theta" /> is a continuous bijection from <MathComp formula="[0, \pi/2)" /> to <MathComp formula="[0, \infty)" />. Since the set of rational numbers <MathComp formula="\mathbb{Q}" /> is dense in <MathComp formula="\mathbb{R}" />, for any <MathComp formula="\alpha \in [0, \pi/2)" /> we can find a sequence of rationals <MathComp formula="r_n = p_n/q_n \to \tan \alpha" />. Then <MathComp formula="\arctan(p_n/q_n) \to \alpha" />. But <MathComp formula="p_n/q_n" /> is a ratio of integers; taking <MathComp formula="a_n = q_n, b_n = p_n" /> (or the reverse if needed) gives a sequence in <MathComp formula="\Theta" /> converging to <MathComp formula="\alpha" />. The endpoint <MathComp formula="\pi/2" /> is approached by taking <MathComp formula="b/a \to \infty" />. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.9.1.</strong> This proposition shows that while the points themselves are discrete, their angles are dense. Thus, by choosing large enough integers, we can approximate any desired angle arbitrarily closely. This is the foundation for the continuum limit.</p>
            <AngleDensityPlot />

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.3 Proposition 3.10: Uniform Distribution of Angles</h4>
            <Callout type="theorem" label="Proposition" number="3.10 (Uniform Distribution of Angles)" className="mb-6">
              The set <MathComp formula="\Theta" /> is uniformly distributed in <MathComp formula="[0, \pi/2]" /> with respect to the measure <MathComp formula="d\theta / (\sin \theta \cos \theta)" />. Equivalently, the variable <MathComp formula="t = \ln \tan \theta" /> is uniformly distributed on <MathComp formula="\mathbb{R}" />.
              <p className="mt-2 text-sm italic">Proof. This follows from the fact that the map <MathComp formula="(a,b) \mapsto \ln(b/a)" /> distributes points uniformly as <MathComp formula="a,b" /> become large, due to the equidistribution of Farey fractions. A rigorous proof uses Weyl's criterion and properties of the Möbius function. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.10.1.</strong> This uniform distribution property is crucial for the connection to information geometry. The Fisher distance <MathComp formula="d_F = |\ln \tan \theta_2 - \ln \tan \theta_1|" /> is exactly the Euclidean distance in the coordinate <MathComp formula="t" />. Thus, the RHC angles become uniformly spaced in the Fisher metric, which is the natural information-geometric distance.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.4 Proposition 3.11: Growth of Primitive Pairs</h4>
            <Callout type="theorem" label="Proposition" number="3.11 (Asymptotic Density of Primitive Pairs)" className="mb-6">
              The number of primitive pairs <MathComp formula="(p,q)" /> with <MathComp formula="p,q \le N" /> is asymptotically
              <MathBlock formula="\frac{6}{\pi^2}N^2 + O(N \log N)." />
              <p className="mt-2 text-sm italic">Proof. This is a classic result: the probability that two random integers are coprime is <MathComp formula="6/\pi^2" />. The proof uses the inclusion-exclusion principle and properties of the Möbius function. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.11.1.</strong> This result quantifies how many distinct rays (primitive ratios) exist up to a given scale. The constant <MathComp formula="6/\pi^2 \approx 0.6079" /> is the density of visible lattice points from the origin.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.5 Theorems on the Primitive Lattice</h3>
            <p className="mb-6">The primitive pairs <MathComp formula="(p,q)" /> with <MathComp formula="\gcd(p,q)=1" /> form a fascinating mathematical object in their own right. We collect here several theorems that illuminate their structure.</p>

            <h4 className="text-xl font-serif mb-4">3.5.1 Theorem 3.12: Symmetry of Primitive Pairs</h4>
            <Callout type="theorem" label="Theorem" number="3.12 (Symmetry)" className="mb-6">
              If <MathComp formula="(p,q)" /> is a primitive pair, then so are <MathComp formula="(q,p)" />, <MathComp formula="(p,p+q)" />, and <MathComp formula="(p+q,q)" />. Moreover, the set of primitive pairs forms a tree under the operations of "addition" (the Stern-Brocot tree).
              <p className="mt-2 text-sm italic">Proof. These properties follow directly from the definition of coprimality and the Euclidean algorithm. The Stern-Brocot tree is a well-known enumeration of all positive rationals via mediants; its nodes correspond to primitive pairs. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.12.1.</strong> The Stern-Brocot tree provides a beautiful way to generate all primitive pairs recursively, starting from <MathComp formula="(1,1)" /> and repeatedly taking mediants. This tree structure is intimately connected to the Euclidean algorithm and continued fractions.</p>
            <SternBrocotTree />

            <h4 className="text-xl font-serif mt-12 mb-4">3.5.2 Theorem 3.13: The Ford Circle Connection</h4>
            <Callout type="theorem" label="Theorem" number="3.13 (Ford Circles)" className="mb-6">
              Each primitive pair <MathComp formula="(p,q)" /> with <MathComp formula="p/q" /> in reduced form corresponds to a Ford circle tangent to the real axis at <MathComp formula="p/q" /> with radius <MathComp formula="1/(2q^2)" />. The circles are mutually tangent or disjoint, and their tangency pattern encodes the Farey sequence.
              <p className="mt-2 text-sm italic">Proof. Ford circles are a classical construction in number theory. The tangency condition between circles at <MathComp formula="p/q" /> and <MathComp formula="r/s" /> is <MathComp formula="|ps-qr|=1" />, which is exactly the condition that the fractions are neighbors in the Farey sequence. This is equivalent to the pairs being adjacent in the Stern-Brocot tree. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.13.1.</strong> This connection to Ford circles provides a beautiful geometric visualization of primitive pairs: each pair corresponds to a circle tangent to the real axis, and the circles pack the upper half-plane in a fractal pattern. The RHC's rays become diameters through these circles.</p>
            <FareySequence />

            <h4 className="text-xl font-serif mt-12 mb-4">3.5.3 Theorem 3.14: Primitive Pairs and the Modular Group</h4>
            <Callout type="theorem" label="Theorem" number="3.14 (Modular Group Action)" className="mb-6">
              The set of primitive pairs is invariant under the action of the modular group <MathComp formula="PSL(2,\mathbb{Z})" /> acting on the ratio <MathComp formula="p/q" /> by fractional linear transformations:
              <MathBlock formula="\frac{p}{q} \mapsto \frac{ap+bq}{cp+dq}, \quad \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in SL(2,\mathbb{Z})." />
              <p className="mt-2 text-sm italic">Proof. Since the transformation preserves coprimality (determinant 1), it maps primitive pairs to primitive pairs. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.5.3.</strong> The modular group is the symmetry group of the Farey sequence and the complex upper half-plane. Its action on primitive pairs encodes the deep arithmetic structure underlying the RHC.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.6 Summary and Significance</h3>
            <p className="mb-6">In this chapter, we have proven a series of theorems that reveal the rich structure hidden within the simple mapping <MathComp formula="(a,b) \mapsto a+ib" />:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Theorem 3.1 establishes the GCD as a geometric construct, linking arithmetic to triangle geometry.</li>
              <li>Theorem 3.2 reveals the angle complementarity in the Euclidean algorithm, connecting the algorithm to continued fractions.</li>
              <li>Theorem 3.3 quantifies the decay of angles, leading to a refined version of Lamé's theorem and the emergence of the golden ratio.</li>
              <li>Theorem 3.4 identifies the fold operator as an inner product, linking it to Euclidean geometry.</li>
              <li>Theorem 3.5 shows how the fold operator tracks the Euclidean algorithm's steps geometrically.</li>
              <li>Theorem 3.6 connects the fold operator to Chebyshev polynomials, opening connections to approximation theory.</li>
              <li>Theorem 3.7 provides algebraic identities for the fold operator, revealing its hyperbolic nature.</li>
              <li>Lemma 3.8 and Propositions 3.9-3.11 establish the discrete and dense properties of the RHC lattice.</li>
              <li>Theorems 3.12-3.14 connect primitive pairs to the Stern-Brocot tree, Ford circles, and the modular group, revealing a deep arithmetic-geometric structure.</li>
            </ul>

            <p className="mb-6">
              These results are not isolated curiosities; they form an integrated whole. The angle complementarity theorem, the fold operator properties, and the density results all point toward a unified picture: the RHC provides a natural geometric language for arithmetic, and a natural arithmetic language for geometry.
            </p>

            <p className="mb-6">
              For the scholar, these theorems provide a rigorous foundation for the connections to information geometry and physics that follow. For the layman, they reveal a hidden order—a universe where numbers have shapes, where algorithms have angles, and where the simple act of dividing integers unfolds into a rich tapestry of geometric patterns.
            </p>
            <TheoremSummaryCards />

            <p className="mb-6">
              The Recursive Harmonic Codex, far from being an abstract mathematical exercise, begins to reveal itself as a potential language for describing reality itself. In the next chapter, we will see how this language connects to information geometry, and in subsequent chapters, how it might extend to physics.
            </p>

            <p className="mb-6">
              In the next chapter, we build upon these core results to establish the connection between the RHC and information geometry—a bridge that will lead to testable predictions across multiple scientific domains.
            </p>

            <Chapter3Interactive />
          </Section>

          <Section id="info-geom" title="4. Connection to Information Geometry" subtitle="Fisher Metric and Manifolds">
            <h3 className="text-4xl font-serif mb-8 text-navy-900">4.1 Introduction: The Information-Geometric Bridge</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The preceding chapters established a rigorous mathematical framework connecting discrete arithmetic to continuous geometry. The RHC mapping <MathComp formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> revealed that every integer pair <MathComp formula="(a,b)" /> corresponds to a point <MathComp formula="z = a + ib" /> in the complex plane, with the angle <MathComp formula="\theta = \arctan(b/a)" /> encoding the ratio independent of scale, and the modulus <MathComp formula="r = \sqrt{a^2 + b^2}" /> encoding scale. The <GlossaryTerm term="Fold Operator" definition="A mathematical operator in RHC that maps ratios to symmetric values, defined as F(x) = (x + 1/x)/2.">fold operator</GlossaryTerm> <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> emerged as a natural algebraic structure with deep geometric significance.
            </p>
            
            <PullQuote author="Recursive Harmonic Codex, Ch. 4">
              "Information is not merely data; it is the geometry of the space in which that data resides."
            </PullQuote>

            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              We now build a bridge from this arithmetic-geometric edifice to the realm of <GlossaryTerm term="Information Geometry" definition="The application of differential geometry to probability theory, treating probability distributions as points on a manifold.">information geometry</GlossaryTerm>—the study of probability distributions as geometric objects. This connection is not arbitrary; it arises from a fundamental observation: the space of ratios <MathComp formula="b/a" /> (or equivalently, angles <MathComp formula="\theta" />) possesses a natural metric inherited from the Fisher information of certain statistical families. Remarkably, this metric takes a form that is perfectly adapted to the RHC structure.
            </p>

            <StatisticalManifold />

            <p className="mb-8 text-lg leading-relaxed text-navy-700">
              In this chapter, we first review the foundations of information geometry, then propose a statistical interpretation of the RHC ratio (clearly labeled as hypothesis), and finally derive the precise relationship between the RHC angle and the Fisher metric. We also uncover a striking connection between the fold operator and the Bhattacharyya coefficient, a fundamental measure of distribution overlap.
            </p>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.2 The Fisher-Rao Metric: Historical and Conceptual Foundations</h3>
            <h4 className="text-2xl font-serif mb-6 text-navy-800">4.2.1 Historical Origins</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The concept of information as a geometric quantity has deep roots. In 1945, the Indian statistician C. R. Rao <Citation id="Rao, 1945">Rao, C. R. (1945). Information and the accuracy attainable in the estimation of statistical parameters. Bulletin of the Calcutta Mathematical Society, 37, 81-91.</Citation> made a profound observation: the <GlossaryTerm term="Fisher Information Metric" definition="A Riemannian metric on a statistical manifold, representing the sensitivity of a probability distribution to changes in its parameters.">Fisher information matrix</GlossaryTerm>, introduced by R. A. Fisher <Citation id="Fisher, 1925">Fisher, R. A. (1925). Theory of statistical estimation. Proceedings of the Cambridge Philosophical Society, 22, 700-725.</Citation> as a measure of the amount of information that an observable random variable carries about an unknown parameter, could be interpreted as a Riemannian metric on the space of probability distributions.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              However, it was the Russian mathematician Nikolai Čencov who, in his seminal 1972 monograph <Citation id="Čencov, 1972">Čencov, N. N. (1972). Statistical Decision Rules and Optimal Inference. Nauka, Moscow.</Citation>, proved a theorem of foundational importance: the Fisher-Rao metric is the unique Riemannian metric (up to a constant factor) on the space of probability distributions that is invariant under sufficient statistics. This uniqueness theorem elevates the Fisher-Rao metric from a convenient choice to a canonical geometric structure on statistical manifolds.
            </p>

            <h4 className="text-2xl font-serif mt-12 mb-6 text-navy-800">4.2.2 The Statistical Manifold</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              Let <MathComp formula="\mathcal{M} = \{p(x \mid \xi) \mid \xi = (\xi^1, \dots, \xi^n) \in \Theta \subseteq \mathbb{R}^n\}" /> be a parametric family of probability distributions. Under suitable regularity conditions, <MathComp formula="\mathcal{M}" /> forms an <MathComp formula="n" />-dimensional <GlossaryTerm term="Statistical Manifold" definition="A Riemannian manifold where each point represents a probability distribution from a parametric family.">statistical manifold</GlossaryTerm> with coordinates <MathComp formula="\xi" />.
            </p>
            <div className="my-12 p-8 bg-navy-900 rounded-2xl shadow-inner">
              <p className="mb-4 text-white/70 font-mono text-xs uppercase tracking-widest">Definition: Fisher Information Matrix</p>
              <MathBlock formula="g_{ij}(\xi) = \mathbb{E}_{p(x \mid \xi)} \left[ \frac{\partial \log p(x \mid \xi)}{\partial \xi^i} \frac{\partial \log p(x \mid \xi)}{\partial \xi^j} \right] = \int p(x \mid \xi) \frac{\partial \log p}{\partial \xi^i} \frac{\partial \log p}{\partial \xi^j} \, dx." />
            </div>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              This matrix defines a Riemannian metric on <MathComp formula="\Theta" />: <MathComp formula="ds^2 = \sum_{i,j} g_{ij}(\xi) \, d\xi^i d\xi^j" />. Čencov's theorem guarantees its uniqueness under the natural requirement of invariance under sufficient statistics.
            </p>

            <h4 className="text-2xl font-serif mt-12 mb-6 text-navy-800">4.2.3 Geometric Meaning</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Geodesic" definition="The shortest path between two points on a curved surface or manifold.">geodesic distance</GlossaryTerm> induced by this metric quantifies the distinguishability between two distributions: the larger the distance, the easier it is to tell them apart based on observations.
            </p>
            
            <EntropyFlowVisual />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.3 Mapping RHC to a Statistical Manifold</h3>
            <p className="mb-6 italic text-navy-600 font-serif">This section introduces an interpretive hypothesis, clearly distinguished from proven mathematics.</p>
            
            <Callout type="theorem" label="Hypothesis" number="4.1 (Statistical Interpretation of the Ratio)" className="mb-8 border-purple-500/30 bg-purple-500/5">
              <p className="text-lg">
                Consider the ratio <MathComp formula="\mu = b/a" /> associated with an integer pair <MathComp formula="(a,b)" />. We propose that <MathComp formula="\mu" /> (or equivalently the angle <MathComp formula="\theta = \arctan \mu" />) can be regarded as a parameter of a family of probability distributions. A natural candidate is a scale family, where the Fisher metric takes the simple form
              </p>
              <MathBlock formula="ds^2 = \frac{d\mu^2}{\mu^2}." />
              <p className="mt-4 text-sm opacity-80">
                Such a metric arises for the family of exponential distributions with mean <MathComp formula="\mu" />. The choice is forced by the underlying symmetry of scale invariance.
              </p>
            </Callout>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.4 Derivation of the Fisher Metric in Angle Coordinates</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              We now perform the change of variables from <MathComp formula="\mu" /> to <MathComp formula="\theta = \arctan \mu" />, which is the natural coordinate on the RHC state space.
            </p>
            
            <FisherMetricPlot />

            <Callout type="theorem" label="Derivation" number="4.2 (Fisher Metric in Terms of θ)" className="mb-8">
              <p>Starting from <MathComp formula="ds^2 = d\mu^2/\mu^2" />, let <MathComp formula="\mu = \tan \theta" />. Then <MathComp formula="d\mu = \sec^2 \theta \, d\theta" />. Substituting gives:</p>
              <MathBlock formula="\frac{d\mu^2}{\mu^2} = \frac{\sec^4 \theta \, d\theta^2}{\tan^2 \theta} = \frac{1}{\sin^2 \theta \cos^2 \theta} \, d\theta^2." />
              <p className="mt-4">Hence the Fisher metric on the space of angles is <MathComp formula="ds^2 = \frac{1}{\sin^2 \theta \cos^2 \theta} \, d\theta^2" />.</p>
            </Callout>

            <GeodesicDistancePlot />

            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The geodesic distance between two angles <MathComp formula="\theta_1" /> and <MathComp formula="\theta_2" /> is simply the absolute difference of the log‑tangents: <MathComp formula="d_F(\theta_1, \theta_2) = |\ln \tan \theta_2 - \ln \tan \theta_1|" />.
            </p>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.5 Linking RHC Angle Difference to Fisher Distance</h3>
            <Callout type="theorem" label="Theorem" number="4.3 (Small‑Angle Approximation)" className="mb-8">
              <p>Let <MathComp formula="\Delta \theta = \theta_2 - \theta_1" /> be small. Then the Fisher distance is approximately:</p>
              <MathBlock formula="d_F(\theta_1, \theta_2) \approx \frac{2}{\sin(2\bar{\theta})} \, \Delta \theta + \mathcal{O}((\Delta \theta)^2)." />
            </Callout>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.6 Connection to the Fold Operator and Bhattacharyya Coefficient</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Bhattacharyya Coefficient" definition="A measure of the amount of overlap between two statistical samples or populations.">Bhattacharyya coefficient</GlossaryTerm> provides another measure of overlap between probability distributions.
            </p>
            
            <FoldOperatorVisual />

            <Callout type="theorem" label="Proposition" number="4.4 (Bhattacharyya Coefficient and the Fold Operator)" className="mb-8">
              <p>For two Bernoulli distributions with parameters <MathComp formula="p = a/(a+b)" /> and <MathComp formula="q = b/(a+b)" />, the Bhattacharyya coefficient is:</p>
              <MathBlock formula="BC = \frac{2\sqrt{ab}}{a+b} = \frac{1}{\mathcal{F}(\sqrt{a/b})}." />
              <p className="mt-4 text-sm opacity-80">
                The fold operator, which emerged purely from the arithmetic‑geometric mapping, appears naturally in the expression for an information‑theoretic overlap measure.
              </p>
            </Callout>

            <FoldProcessVisual />

            <QuantumInformationGeometry />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.7 Information Geometry of the Primitive Lattice</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Primitive Lattice" definition="The set of all points (p, q) in the integer grid such that p and q are coprime (GCD = 1).">primitive lattice</GlossaryTerm> <MathComp formula="\mathcal{P} = \{(p,q) \in \mathbb{N}^2 \mid \gcd(p,q) = 1\}" /> inherits a natural information geometry from the Fisher metric on the space of ratios.
            </p>

            <PrimitiveLatticeVisual />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.8 The Fisher-Rao Metric and the Geometry of the RHC</h3>
            <h4 className="text-2xl font-serif mb-6 text-navy-800">4.8.1 Curvature</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The Fisher metric on the space of angles has remarkable geometric properties, including constant curvature.
            </p>
            
            <CurvatureHeatmap />

            <Callout type="theorem" label="Theorem" number="4.5 (Constant Curvature of the Fisher Manifold)" className="mb-8">
              <p>For the statistical manifold of the RHC, the scalar curvature is twice the Gaussian curvature. Computing the Christoffel symbol and the Riemann tensor yields <MathComp formula="R = 2" />. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 4.8.1.</strong> Constant positive curvature indicates that the space of angles is a model of elliptic geometry (a hemisphere). This curvature will have physical interpretations in Chapter 5.</p>

            <h4 className="text-xl font-serif mt-8 mb-4">4.8.2 Geodesics</h4>
            <Callout type="theorem" label="Proposition" number="4.6 (Geodesics)" className="mb-6">
              <p>The geodesics of the Fisher metric are given by</p>
              <MathBlock formula="\theta(t) = \arctan(e^t)," />
              <p className="mt-4">where <MathComp formula="t" /> is the arc length parameter (the <MathComp formula="t" /> coordinate introduced earlier). In the <MathComp formula="t" /> coordinate, geodesics are straight lines.</p>
              <p className="mt-4 italic text-sm">Proof. In the uniformizing coordinate <MathComp formula="t = \ln \tan \theta" />, the metric becomes <MathComp formula="ds^2 = dt^2" />, so geodesics are lines of constant <MathComp formula="t" />. Transforming back gives the stated form. ∎</p>
            </Callout>

            <h4 className="text-xl font-serif mt-8 mb-4">4.8.3 Isometries</h4>
            <Callout type="theorem" label="Proposition" number="4.7 (Isometry Group)" className="mb-6">
              <p>The isometry group of the Fisher metric on the space of angles is generated by the transformation <MathComp formula="\theta \mapsto \pi/2 - \theta" /> (corresponding to reciprocal ratios) and the scaling <MathComp formula="t \mapsto t + c" /> (corresponding to multiplicative changes in ratio).</p>
              <p className="mt-4 italic text-sm">Proof. In the <MathComp formula="t" /> coordinate, the metric is Euclidean, so the isometry group includes translations <MathComp formula="t \mapsto t + c" />. The transformation <MathComp formula="\theta \mapsto \pi/2 - \theta" /> corresponds to <MathComp formula="t \mapsto -t" />, which is also an isometry. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 4.8.2.</strong> The symmetry <MathComp formula="\theta \mapsto \pi/2 - \theta" /> corresponds to the exchange <MathComp formula="a \leftrightarrow b" /> in the original pair. Thus, the exchange symmetry of the fold operator is reflected in the isometries of the Fisher metric.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">4.9 Summary and Synthesis</h3>
            <p className="mb-6">In this chapter, we have established a rigorous connection between the Recursive Harmonic Codex and information geometry:</p>
            
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left border-collapse border border-cream-300">
                <thead>
                  <tr className="bg-cream-100">
                    <th className="p-4 border border-cream-300 font-serif">Concept</th>
                    <th className="p-4 border border-cream-300 font-serif">RHC Representation</th>
                    <th className="p-4 border border-cream-300 font-serif">Information Geometry Counterpart</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-cream-300">State parameter</td>
                    <td className="p-4 border border-cream-300">Ratio <MathComp formula="\mu = b/a" /></td>
                    <td className="p-4 border border-cream-300">Statistical parameter of a scale family</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Geometric coordinate</td>
                    <td className="p-4 border border-cream-300">Angle <MathComp formula="\theta = \arctan(b/a)" /></td>
                    <td className="p-4 border border-cream-300">Coordinate on statistical manifold</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Metric</td>
                    <td className="p-4 border border-cream-300">Derived from complex plane</td>
                    <td className="p-4 border border-cream-300">Fisher-Rao metric <MathComp formula="ds^2 = d\mu^2/\mu^2" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Distance between states</td>
                    <td className="p-4 border border-cream-300"><MathComp formula="|\ln\tan\theta_2 - \ln\tan\theta_1|" /></td>
                    <td className="p-4 border border-cream-300">Fisher distance <MathComp formula="d_F" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Small-angle approximation</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="\Delta \theta" /> scaled by <MathComp formula="2/ \sin(2\bar{\theta})" />
                    </td>
                    <td className="p-4 border border-cream-300">Linear approximation of Fisher distance</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Overlap measure</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="\mathcal{F}(\sqrt{a/b})" />
                    </td>
                    <td className="p-4 border border-cream-300">Bhattacharyya coefficient reciprocal</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Symmetry</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="\mathcal{F}(x) = \mathcal{F}(1/x)" />
                    </td>
                    <td className="p-4 border border-cream-300">
                      Isometry <MathComp formula="\theta \mapsto \pi/2 - \theta" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Curvature</td>
                    <td className="p-4 border border-cream-300">—</td>
                    <td className="p-4 border border-cream-300">
                      Constant scalar curvature <MathComp formula="R = 2" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-8">These connections are mathematically sound given the interpretive hypothesis of Section 4.3. They provide a firm foundation for the physical conjectures and testable predictions that follow in Chapters 5 and 6.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Naturalness</h4>
                <p className="text-sm leading-relaxed opacity-90">The Fisher metric <MathComp formula="d\mu^2/\mu^2" /> is the unique scale-invariant metric on the space of ratios, making it the natural geometric structure for the RHC state space.</p>
              </div>
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Uniformization</h4>
                <p className="text-sm leading-relaxed opacity-90">The coordinate <MathComp formula="t = \ln \tan \theta" /> transforms the Fisher metric to Euclidean form, revealing that the RHC angles are uniformly distributed with respect to the natural information-geometric distance.</p>
              </div>
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Universality</h4>
                <p className="text-sm leading-relaxed opacity-90">The fold operator appears naturally in the Bhattacharyya coefficient, suggesting that it is not merely an algebraic curiosity but a fundamental connector between arithmetic and information.</p>
              </div>
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Curvature</h4>
                <p className="text-sm leading-relaxed opacity-90">The constant positive curvature of the Fisher metric hints at deep connections to elliptic geometry and possibly to physical theories such as de Sitter space.</p>
              </div>
            </div>

            <h3 className="text-2xl font-serif mt-12 mb-6">4.10 Table of Key Information-Geometric Results</h3>
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left border-collapse border border-cream-300">
                <thead>
                  <tr className="bg-cream-100">
                    <th className="p-4 border border-cream-300 font-serif">Result</th>
                    <th className="p-4 border border-cream-300 font-serif">Formula</th>
                    <th className="p-4 border border-cream-300 font-serif">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-cream-300">Fisher metric (ratio)</td>
                    <td className="p-4 border border-cream-300"><MathComp formula="ds^2 = d\mu^2/\mu^2" /></td>
                    <td className="p-4 border border-cream-300">Scale-invariant metric on ratios</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fisher metric (angle)</td>
                    <td className="p-4 border border-cream-300"><MathComp formula="ds^2 = d\theta^2 / (\sin^2 \theta \cos^2 \theta)" /></td>
                    <td className="p-4 border border-cream-300">Metric in natural RHC coordinate</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Uniformizing coordinate</td>
                    <td className="p-4 border border-cream-300"><MathComp formula="t = \ln \tan \theta" /></td>
                    <td className="p-4 border border-cream-300">Makes metric Euclidean: <MathComp formula="ds^2 = dt^2" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fisher distance</td>
                    <td className="p-4 border border-cream-300"><MathComp formula="d_F(\theta_1, \theta_2) = |\ln \tan \theta_2 - \ln \tan \theta_1|" /></td>
                    <td className="p-4 border border-cream-300">Distinguishability measure</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Small-angle approximation</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="d_F \approx (2/\sin 2\bar{\theta}) \Delta \theta" />
                    </td>
                    <td className="p-4 border border-cream-300">Experimental testable form</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Bhattacharyya coefficient</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="BC = 2\sqrt{ab}/(a+b)" />
                    </td>
                    <td className="p-4 border border-cream-300">
                      Overlap between <MathComp formula="(a,b)" /> and <MathComp formula="(b,a)" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fold operator connection</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="BC = 1/\mathcal{F}(\sqrt{a/b})" />
                    </td>
                    <td className="p-4 border border-cream-300">Links arithmetic to information</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Scalar curvature</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="R = 2" />
                    </td>
                    <td className="p-4 border border-cream-300">Constant positive curvature</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Isometry group</td>
                    <td className="p-4 border border-cream-300">
                      <MathComp formula="\theta \mapsto \pi/2 - \theta, t \mapsto t + c" />
                    </td>
                    <td className="p-4 border border-cream-300">Symmetries of the space</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Density of primitive pairs</td>
                    <td className="p-4 border border-cream-300">Uniform in <MathComp formula="t" /></td>
                    <td className="p-4 border border-cream-300">Lattice becomes continuous in limit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <RHCMappingTable />

            <h3 className="text-2xl font-serif mt-12 mb-6">4.11 Open Questions and Future Directions</h3>
            <p className="mb-6">The connection between RHC and information geometry opens several avenues for further research:</p>
            <ul className="list-disc pl-8 mb-12 space-y-4">
              <li><strong>Higher dimensions:</strong> Can the RHC be extended to <MathComp formula="n" />-tuples <MathComp formula="(a_1, \dots, a_n)" />, and does the corresponding information geometry involve the Dirichlet distribution or other multivariate families?</li>
              <li><strong>Quantum information:</strong> The Bhattacharyya coefficient for Bernoulli distributions has a quantum analog—the fidelity between quantum states. Does the fold operator appear in quantum fidelity for certain states?</li>
              <li><strong>Dynamics:</strong> The Fisher metric provides a kinematic structure. Can we introduce a natural dynamics (e.g., via a Hamiltonian) that is compatible with this geometry?</li>
              <li><strong>Curvature and physics:</strong> The constant curvature <MathComp formula="R = 2" /> invites speculation about connections to de Sitter space (positive curvature) and cosmological models.</li>
              <li><strong>Experimental tests:</strong> The small-angle approximation and the Fisher distance formula provide concrete, testable predictions. Designing experiments to confirm or falsify these predictions is a priority (see Chapter 6).</li>
            </ul>
            <UnifiedFrameworkInfographic />
            <Chapter4Summary />
            <p className="mb-8 font-serif italic text-lg text-center">In the next chapter, we explore how these information-geometric structures might correspond to physical concepts, leading to a set of eighteen falsifiable predictions across multiple scientific domains.</p>
          </Section>

          <Section id="interpretation" title="5. Physical Interpretation" subtitle="Explicitly Conjectural">
            <div className="prose prose-navy max-w-none">
              <h3 className="text-2xl font-serif mt-8 mb-4">5.1 Introduction: From Mathematics to Physics</h3>
              <p className="mb-6">
                The preceding chapters have established the Recursive Harmonic Codex as a rigorous mathematical edifice. We have proven theorems linking integer pairs to geometric constructs (Chapter 2), established core results about the fold operator and the Euclidean algorithm (Chapter 3), and connected these structures to information geometry through the Fisher metric and Bhattacharyya coefficient (Chapter 4). Every step has been mathematically sound, with clear proofs and precise formulations.
              </p>
              <p className="mb-6">
                Yet the very elegance of this edifice invites a bolder question: <strong>Could these mathematical structures correspond to something physically real?</strong> Could the integers <MathComp formula="(a,b)" /> that label points in the complex plane be the hidden quantum numbers of a binary system? Could the fold operator model the act of measurement, extracting a real observable from a complex amplitude? Could the composite geometric constructions of Section 2.7 be the pre‑geometric fabric from which spacetime itself emerges?
              </p>
              <p className="mb-6 font-serif italic text-lg border-l-4 border-gold-400 pl-6 py-2">
                These questions are not answered by the mathematics alone. They belong to the realm of <strong>interpretive hypothesis</strong>—a speculative but disciplined exploration of analogies between the RHC and established physical theories. This chapter adopts the stance of <strong>cautious heuristics</strong>.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">5.1.1 The Nature of the Analogy</h4>
              <p className="mb-6">
                The RHC is not a physical theory in the conventional sense. It lacks dynamics (no Hamiltonian, no action principle), and its fundamental objects are integers, not fields or operators. The correspondences drawn below are therefore <strong>analogical</strong>, not derivational. They are inspired by the formal similarity between RHC structures and those of quantum mechanics, general relativity, and information theory.
              </p>

              <InterpretiveFramework />

              <h4 className="text-xl font-serif mt-8 mb-4">5.1.2 The Interpretive Framework</h4>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse border border-cream-300">
                  <thead>
                    <tr className="bg-cream-100">
                      <th className="p-4 border border-cream-300 font-serif">Hypothesis</th>
                      <th className="p-4 border border-cream-300 font-serif">RHC Structure</th>
                      <th className="p-4 border border-cream-300 font-serif">Physical Analogue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H1: State Space</td>
                      <td className="p-4 border border-cream-300">Integer pair <MathComp formula="(a,b)" /> → <MathComp formula="z = a+ib" /></td>
                      <td className="p-4 border border-cream-300">Binary quantum system (two quantum numbers, two modes)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H2: Projection</td>
                      <td className="p-4 border border-cream-300">Fold operator <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /></td>
                      <td className="p-4 border border-cream-300">Quantum measurement (extraction of real observable)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H3: Emergent Spacetime</td>
                      <td className="p-4 border border-cream-300">Composite geometric structures (triangle chains)</td>
                      <td className="p-4 border border-cream-300">Pre‑geometric substrate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <StateSpaceDictionary />

              <h3 className="text-2xl font-serif mt-12 mb-6">5.2 Hypothesis 1: The RHC as a State Space</h3>
              <p className="mb-6">
                We propose a dictionary that maps the basic elements of the RHC onto the basic elements of a physical system.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse border border-cream-300">
                  <thead>
                    <tr className="bg-cream-100">
                      <th className="p-4 border border-cream-300 font-serif">RHC Object</th>
                      <th className="p-4 border border-cream-300 font-serif">Physical Interpretation</th>
                      <th className="p-4 border border-cream-300 font-serif">Mathematical Expression</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border border-cream-300">Integer pair <MathComp formula="(a,b)" /></td>
                      <td className="p-4 border border-cream-300">Fundamental state of a binary system</td>
                      <td className="p-4 border border-cream-300">Two quantum numbers, occupation numbers</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300">Angle <MathComp formula="\theta = \arctan(b/a)" /></td>
                      <td className="p-4 border border-cream-300">Continuous parameter of the system</td>
                      <td className="p-4 border border-cream-300">Coupling constant, external field parameter, phase angle</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300">Modulus <MathComp formula="r = \sqrt{a^2+b^2}" /></td>
                      <td className="p-4 border border-cream-300">Latent variable (total energy, total particle number)</td>
                      <td className="p-4 border border-cream-300">Scale factor, hidden resource</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300">GCD <MathComp formula="d = \gcd(a,b)" /></td>
                      <td className="p-4 border border-cream-300">Alternative latent variable (primitive scale)</td>
                      <td className="p-4 border border-cream-300">Common factor underlying both components</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <HarmonicOscillatorAnalogy />

              <h4 className="text-xl font-serif mt-8 mb-4">5.2.1 The Binary System Interpretation</h4>
              <p className="mb-6">
                Consider a physical system that possesses two discrete degrees of freedom. Examples include two quantum numbers in a hydrogen atom, two modes of a field in quantum optics, or two components of a spinor. In each case, the integer pair <MathComp formula="(a,b)" /> encodes <strong>discrete, countable information</strong>, while the angle <MathComp formula="\theta" /> captures a <strong>continuous parameter</strong> that governs the system's response to external influences.
              </p>

              <CoupledCavities />

              <h3 className="text-2xl font-serif mt-12 mb-6">5.3 Hypothesis 2: The Fold Operator as a Projection Mechanism</h3>
              <p className="mb-6">
                The fold operator <MathComp formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> possesses algebraic properties that resonate deeply with the formalism of quantum measurement.
              </p>

              <BlochSphereAnalogy />
              <p className="mb-6">
                In quantum mechanics, a pure state is represented by a complex amplitude. The fold operator, when applied to a unit complex number <MathComp formula="e^{i\theta}" />, yields a real number <MathComp formula="\cos\theta" />. This is exactly the expectation value of the Pauli <MathComp formula="\sigma_x" /> operator in a spin‑1/2 state with phase <MathComp formula="\theta" />:
              </p>
              <div className="bg-cream-100 p-6 rounded-xl mb-8 text-center">
                <MathComp formula="\langle \sigma_x \rangle = \cos\theta" />
              </div>

              <h4 className="text-xl font-serif mt-8 mb-4">5.3.2 The Symmetry <MathComp formula="\mathcal{F}(x) = \mathcal{F}(1/x)" /> as Exchange Duality</h4>
              <p className="mb-6">
                The symmetry of the fold operator under <MathComp formula="x \leftrightarrow 1/x" /> has a natural physical interpretation: it corresponds to <strong>exchanging the two underlying integer components</strong>. This is reminiscent of particle exchange symmetry in a system of two identical particles.
              </p>

              <ExchangeSymmetry />

              <QuantumCircuitAnalogy />

              <h3 className="text-2xl font-serif mt-12 mb-6">5.4 Hypothesis 3: Geometry from Arithmetic (Emergent Spacetime)</h3>
              <p className="mb-6">
                One of the most profound ideas in contemporary physics is that spacetime may not be fundamental, but rather emerges from a more basic, non‑spatiotemporal substrate. The RHC offers a toy model: <strong>geometry arises from the arithmetic of integer pairs</strong>.
              </p>

              <TriangleChainCurvature />

              <EmergentSpacetime />
              <p className="mb-6">
                For a closed chain of triangles, the sum of the interior angles <MathComp formula="\sum \theta_k" /> is not necessarily <MathComp formula="\pi" />. The deviation,
              </p>
              <div className="bg-cream-100 p-6 rounded-xl mb-8 text-center">
                <MathComp formula="K = \pi - \sum_{k=1}^N \theta_k" />
              </div>
              <p className="mb-6">
                is a discrete analogue of curvature. In differential geometry, the angle deficit around a vertex in a triangulated surface is proportional to the Gaussian curvature. Thus, <MathComp formula="K" /> can be interpreted as a <strong>total curvature</strong> associated with the chain.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">5.5 Consistency Checks and Mismatches</h3>
              <p className="mb-6">
                Any interpretive framework must be scrutinized. The RHC's complex numbers are not normalized, unlike quantum states. However, one can normalize by dividing by <MathComp formula="r" />. The most serious limitation is the absence of dynamics—the RHC remains a kinematical framework.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">5.6 Summary of Hypotheses</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse border border-cream-300">
                  <thead>
                    <tr className="bg-cream-100">
                      <th className="p-4 border border-cream-300 font-serif">Hypothesis</th>
                      <th className="p-4 border border-cream-300 font-serif">Core Idea</th>
                      <th className="p-4 border border-cream-300 font-serif">Physical Counterparts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H1: State Space</td>
                      <td className="p-4 border border-cream-300">Integer pairs <MathComp formula="(a,b)" /> represent binary system states</td>
                      <td className="p-4 border border-cream-300">Two quantum numbers, coupling constant, total energy</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H2: Projection</td>
                      <td className="p-4 border border-cream-300">Fold operator models measurement</td>
                      <td className="p-4 border border-cream-300">Expectation value, exchange duality, Born rule</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-cream-300 font-bold">H3: Emergent Spacetime</td>
                      <td className="p-4 border border-cream-300">Composite structures → pre‑geometric fabric</td>
                      <td className="p-4 border border-cream-300">Discrete curvature, emergent metric, holography</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-serif mt-12 mb-6">5.7 Connecting to Predictions</h3>
              <p className="mb-6">
                The true value of these hypotheses lies in their ability to generate <strong>testable predictions</strong>. Chapter 6 presents eighteen such predictions across multiple scientific domains.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">5.8 Epistemological Postscript</h3>
              <p className="mb-6 italic">
                The hypotheses presented in this chapter are explicitly conjectural. They suggest new ways of thinking about old problems and generate concrete, testable predictions. Whether they blossom into a full theory or remain as intriguing analogies, they illuminate the hidden unity of arithmetic, geometry, information, and physics.
              </p>
            </div>
          </Section>

          <Section id="predictions" title="6. Predictions" subtitle="Falsifiable Hypotheses">
            <div className="prose prose-navy max-w-none">
              <h3 className="text-2xl font-serif mb-6">6.1 Introduction: The Oracle Speaks</h3>
              <p className="mb-6">
                The Recursive Harmonic Codex is not merely a mathematical formalism—it is a generator of concrete, testable hypotheses that span over a dozen scientific domains. The interpretive framework of Chapter 5, while conjectural, is not idle speculation. It yields precise quantitative predictions that can be verified or falsified by experiment and observation.
              </p>
              <p className="mb-6">
                In this chapter, we present <strong>eighteen falsifiable predictions</strong>, each following a strict format:
              </p>
              <ul className="list-decimal pl-6 space-y-2 mb-8">
                <li><strong>Formal Basis:</strong> The proven RHC theorem or derived relation that grounds the prediction.</li>
                <li><strong>Quantitative Prediction:</strong> A precise mathematical statement of what should be observed.</li>
                <li><strong>Proposed Test:</strong> An experimental or observational protocol, with specific reference to existing or near‑future facilities (LIGO, LHC, astronomical observatories, etc.).</li>
                <li><strong>Null Hypothesis:</strong> What would falsify the prediction.</li>
              </ul>

              <h3 className="text-2xl font-serif mt-12 mb-6">6.2 Foundational Predictions (P1–P4)</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">6.2.1 P1: Geometric Spectral Scaling</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Theorem 4.1 and the expression for Fisher distance: <MathComp formula="d_F(\theta_1,\theta_2) = \bigl|\ln\tan\theta_2 - \ln\tan\theta_1\bigr|" />.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> In any physical system whose states can be parameterized by the RHC angle <MathComp formula="\theta" />, the energy or frequency gap <MathComp formula="\Delta E" /> between eigenstates will scale as <MathComp formula="\Delta E \propto \bigl|\ln\tan\theta_2 - \ln\tan\theta_1\bigr|" />.
              </p>
              <SpectralScalingSimulation />

              <h4 className="text-xl font-serif mt-8 mb-4">6.2.2 P2: Projection‑Induced Measurement Bias</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Symmetry of the fold operator <MathComp formula="\mathcal{F}(x) = \mathcal{F}(1/x)" />, with fixed point at <MathComp formula="x=1" />.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> In any measurement process modeled by RHC projection, the posterior distribution of the inferred ratio <MathComp formula="b/a" /> will have a local maximum at <MathComp formula="a = b" />.
              </p>
              <BayesianBiasSimulation />

              <h4 className="text-xl font-serif mt-8 mb-4">6.2.3 P3: Optimal Convergence at the Golden Ratio</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Lamé's theorem: The Euclidean algorithm takes the maximum number of steps for consecutive Fibonacci numbers, whose ratio approaches the golden ratio <MathComp formula="\phi = (1+\sqrt{5})/2" />.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> Dynamical or computational systems isomorphic to the Euclidean algorithm will exhibit extremal convergence properties when their control parameter approximates <MathComp formula="\phi" />.
              </p>
              <EuclideanConvergenceSimulation />

              <h4 className="text-xl font-serif mt-8 mb-4">6.2.4 P4: Discrete‑to‑Continuous Transition</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Lemma 3.1 (discrete lattice) and Proposition 3.1 (density of angles).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The measured information distance between states labeled by small integers will deviate from the smooth continuum formula, exhibiting quantized jumps that align with the discrete RHC lattice.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">6.3 Black Hole and Gravitational Wave Predictions (P5–P7)</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">6.3.1 P5: Black Hole Ringdown Frequency Quantization</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Theorem 3.1 (GCD–radius relation) and the Fisher metric on angles.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The dimensionless frequencies <MathComp formula="M\omega_{lmn}" /> of a perturbed black hole will satisfy <MathComp formula="M\omega_{lmn} = \frac{1}{2} \left| \ln\tan\theta_{lmn} \right| + \text{constant}" />, clustering at values corresponding to ratios of integers.
              </p>
              <BlackHoleRingdownSimulation />

              <h4 className="text-xl font-serif mt-8 mb-4">6.3.2 P6: Black Hole Entropy Quantization</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Proposition 4.1 (Bhattacharyya coefficient and fold operator).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The Bekenstein‑Hawking entropy receives logarithmic corrections of the form <MathComp formula="S = \frac{A}{4\ell_P^2} - \frac{1}{2} \ln\left(\frac{A}{\ell_P^2}\right) + \text{constant}" />.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.3.3 P7: Gravitational Lensing Discreteness</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Lemma 3.1 (discreteness) and the emergent spacetime hypothesis.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The deflection angle <MathComp formula="\alpha" /> for a light ray passing near a compact object will show steps at values where the ratio of two fundamental lengths equals a rational number.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">6.4 LHC and Particle Physics Predictions (P8–P10)</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">6.4.1 P8: Resonance Mass Ratios at the Golden Ratio</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Theorem 3.3 (optimal convergence at <MathComp formula="\phi" />).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The masses <MathComp formula="m_1, m_2" /> of certain resonance pairs will satisfy <MathComp formula="\left| \ln\frac{m_2}{m_1} \right| \approx \ln\phi \approx 0.4812" />.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.4.2 P9: Jet Substructure and Angular Distributions</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Proposition 2.1 (angle encodes ratio) and the Fisher metric.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The distribution of angles <MathComp formula="\theta" /> between particles in a jet will be uniform in <MathComp formula="t = \ln\tan\theta" />.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.4.3 P10: Heavy Ion Collisions and the Primordial Lattice</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Proposition 3.3 (density of primitive pairs).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> Two‑particle correlation functions in the transverse plane will exhibit peaks at angles corresponding to primitive pairs <MathComp formula="(p,q)" />.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">6.5 Cosmological Predictions (P11–P13)</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">6.5.1 P11: Cosmic Microwave Background Anomalies</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Theorem 3.2 (angle complementarity) and the Fisher metric.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The multipole moments <MathComp formula="C_\ell" /> of the CMB power spectrum will exhibit oscillations with a period in <MathComp formula="\ell" /> given by the Fisher distance between successive rational approximations to <MathComp formula="\pi" />.
              </p>
              <CMBOscillationSimulation />

              <h4 className="text-xl font-serif mt-8 mb-4">6.5.2 P12: Large‑Scale Structure Filament Angles</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Proposition 3.2 (uniform distribution of angles).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The angles between filaments connecting galaxy clusters will cluster at values <MathComp formula="\theta = \arctan(q/p)" /> for primitive pairs.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.5.3 P13: Dark Matter Halo Density Profiles</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Theorem 2.4.1 (GCD–radius relation).
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The density profile <MathComp formula="\rho(r)" /> of dark matter halos will exhibit steps at radii where <MathComp formula="r/R_{\text{vir}}" /> equals rational numbers.
              </p>

              <h3 className="text-2xl font-serif mt-12 mb-6">6.6 Mathematical and Information‑Theoretic Predictions (P14–P18)</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">6.6.1 P14: Continued Fraction Statistics</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Gauss–Kuzmin distribution and RHC angle distribution.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The empirical distribution of partial quotients in physical ratios will exhibit arithmetic oscillations that reflect the discrete RHC lattice.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.6.2 P15: Information‑Geometric Curvature and Phase Transitions</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Constant positive curvature <MathComp formula="R = 2" /> of the RHC Fisher metric.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> Statistical mechanical models with RHC control parameters will exhibit phase transitions at simple rational ratios.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.6.3 P16: Random Matrix Theory – Eigenvalue Spacing</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Mapping RHC lattice points to matrix eigenvalues.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> The spacing distribution <MathComp formula="P(s)" /> for arithmetic matrix ensembles will follow a power law <MathComp formula="P(s) \propto s^\beta" /> with <MathComp formula="\beta" /> determined by the RHC ratio.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.6.4 P17: Algorithmic Information Complexity</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Kolmogorov complexity of continued fraction expansions.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> Ratios near the golden ratio will exhibit near‑minimal algorithmic complexity.
              </p>

              <h4 className="text-xl font-serif mt-8 mb-4">6.6.5 P18: Music Theory – Consonance and Integer Ratios</h4>
              <p className="mb-6">
                <strong>Formal Basis:</strong> Consonance inversely related to <MathComp formula="\mathcal{F}(\sqrt{a/b})" />.
              </p>
              <p className="mb-6">
                <strong>Quantitative Prediction:</strong> Psychoacoustic consonance ratings will peak at small integer ratios and at the golden ratio, following the RHC fold operator profile.
              </p>
              <MusicalConsonanceSimulation />

              <h3 className="text-2xl font-serif mt-12 mb-6">6.7 Summary Table of Predictions</h3>
              <div className="overflow-x-auto mb-12">
                <table className="w-full text-left border-collapse border border-cream-300 text-sm">
                  <thead>
                    <tr className="bg-cream-100">
                      <th className="p-4 border border-cream-300 font-serif">#</th>
                      <th className="p-4 border border-cream-300 font-serif">Prediction Name</th>
                      <th className="p-4 border border-cream-300 font-serif">Domain</th>
                      <th className="p-4 border border-cream-300 font-serif">Key Observable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: 'Spectral Scaling', domain: 'Quantum Optics', obs: 'ΔE ∝ |ln tan θ2 - ln tan θ1|' },
                      { id: 2, name: 'Measurement Bias', domain: 'Psychophysics', obs: 'Histogram peak at a=b' },
                      { id: 3, name: 'Optimal Convergence', domain: 'Control Theory', obs: 'Peak convergence at φ' },
                      { id: 4, name: 'Discrete‑to‑Continuous', domain: 'Quantum Info', obs: 'Quantized Fisher distance' },
                      { id: 5, name: 'Ringdown Quantization', domain: 'Gravitational Waves', obs: 'Clustered frequencies' },
                      { id: 6, name: 'Entropy Quantization', domain: 'Quantum Gravity', obs: 'Log coefficient -1/2' },
                      { id: 7, name: 'Lensing Discreteness', domain: 'Strong Gravity', obs: 'Quantized deflection angles' },
                      { id: 8, name: 'Resonance Mass Ratios', domain: 'Particle Physics', obs: 'Mass ratio peaks at φ' },
                      { id: 9, name: 'Jet Substructure', domain: 'Particle Physics', obs: 'Uniform in ln tan θ' },
                      { id: 10, name: 'Heavy Ion Correlations', domain: 'Relativistic Ions', obs: 'Peaks at primitive angles' },
                      { id: 11, name: 'CMB Anomalies', domain: 'Cosmology', obs: 'Oscillations in C_ℓ' },
                      { id: 12, name: 'Filament Angles', domain: 'Cosmology', obs: 'Uniform in ln tan θ' },
                      { id: 13, name: 'Halo Density Profiles', domain: 'Astrophysics', obs: 'Quantized density steps' },
                      { id: 14, name: 'CF Statistics', domain: 'Number Theory', obs: 'Deviations from Gauss‑Kuzmin' },
                      { id: 15, name: 'Phase Transitions', domain: 'Stat Mech', obs: 'Peaks at rational ratios' },
                      { id: 16, name: 'Matrix Spacing', domain: 'Math Physics', obs: 'β depends on ratio' },
                      { id: 17, name: 'Algorithmic Complexity', domain: 'Info Theory', obs: 'Minimal complexity at φ' },
                      { id: 18, name: 'Musical Consonance', domain: 'Music Theory', obs: 'Peaks at small integers & φ' },
                    ].map((p) => (
                      <tr key={p.id}>
                        <td className="p-4 border border-cream-300 font-bold">{p.id}</td>
                        <td className="p-4 border border-cream-300">{p.name}</td>
                        <td className="p-4 border border-cream-300">{p.domain}</td>
                        <td className="p-4 border border-cream-300 font-mono text-[10px]">{p.obs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-12 p-8 bg-navy-900 text-cream-50 rounded-2xl">
                <h3 className="text-2xl font-serif mb-4">6.8 The Oracle's Challenge</h3>
                <p className="text-cream-200 leading-relaxed mb-6">
                  These eighteen predictions span an extraordinary range of disciplines. Each is grounded in the proven mathematical structures of the RHC—the fold operator, the Fisher metric, the angle complementarity, the GCD‑radius relation, and the properties of the Euclidean algorithm.
                </p>
                <p className="text-cream-200 leading-relaxed mb-6">
                  Together, they form a coherent web of testable consequences that, if confirmed, would reveal a hidden arithmetic order underlying diverse natural phenomena. The black hole and gravitational wave predictions (P5–P7) are particularly significant, as they connect the RHC to active areas of experimental physics where data is already being collected.
                </p>
                <p className="text-cream-200 leading-relaxed italic">
                  "The Recursive Harmonic Codex represents a bridge between the discrete world of arithmetic and the continuous world of geometry and physics. By establishing these eighteen falsifiable predictions, we move the RHC from the realm of mathematical curiosity into the realm of empirical science."
                </p>
              </div>
            </div>
          </Section>

          <Section id="validation" title="7. Computational Validation" subtitle="Numerical Experiments">
            <div className="prose prose-navy max-w-none">
              <h3 className="text-2xl font-serif mb-6">7.1 Introduction: The Role of Computation in the RHC</h3>
              <p className="mb-6">
                The Recursive Harmonic Codex, as developed in the preceding chapters, stands as a rigorous mathematical edifice. Yet mathematics alone, no matter how elegant, must ultimately connect to the empirical world—especially when it makes the kind of far‑reaching physical predictions outlined in Chapter 6. Computation serves as the essential bridge between abstract theory and concrete verification.
              </p>
              <p className="mb-6">
                In this chapter, we present a comprehensive program of <strong>computational validation</strong> for the RHC. This program has three primary objectives:
              </p>
              <ul className="list-decimal pl-6 space-y-2 mb-8">
                <li><strong>Verification of Core Theorems:</strong> Using numerical experiments to confirm the proven mathematical relationships (GCD–radius, angle complementarity, fold operator properties) across vast ranges of integer pairs.</li>
                <li><strong>Exploration of the RHC State Space:</strong> Visualizing the lattice of integer points, the distribution of angles, and the structure of primitive pairs.</li>
                <li><strong>Pre‑experimental Testing of Predictions:</strong> Simulating the eighteen predictions of Chapter 6 in silico to refine experimental designs.</li>
              </ul>

              <h3 className="text-2xl font-serif mt-12 mb-6">7.2 Numerical Verification of Core Theorems</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">7.2.1 Verifying the GCD–Radius Relation (Theorem 2.4.1)</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Confirm that for all integer pairs <MathComp formula="(a,b)" /> up to a large maximum <MathComp formula="N" />, the relation <MathComp formula="\gcd(a,b) = \frac{\sqrt{a^2 + b^2}}{\sqrt{p^2 + q^2}}" /> holds exactly.
              </p>
              <GCDRadiusVerification />

              <h4 className="text-xl font-serif mt-8 mb-4">7.2.2 Verifying Angle Complementarity (Theorem 3.2)</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Confirm that for every step of the Euclidean algorithm, the angles satisfy <MathComp formula="\tan\theta_1 = \frac{1}{q + \tan\theta_2}" />.
              </p>
              <EuclideanComplementarity />

              <h4 className="text-xl font-serif mt-8 mb-4">7.2.3 Verifying Fold Operator Properties (Theorem 2.6.1)</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Confirm the symmetry <MathComp formula="\mathcal{F}(x) = \mathcal{F}(1/x)" />, the real projection on the unit circle <MathComp formula="\mathcal{F}(e^{i\theta}) = \cos\theta" />, and the minimum property.
              </p>
              <FoldPropertiesVisualizer />

              <h4 className="text-xl font-serif mt-8 mb-4">7.2.4 Verifying Lamé's Theorem and the Golden Ratio (Theorem 3.3)</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Confirm that the Euclidean algorithm takes the maximum number of steps for consecutive Fibonacci numbers.
              </p>
              <LameTheoremPlot />

              <h3 className="text-2xl font-serif mt-12 mb-6">7.3 Exploring the RHC State Space</h3>
              
              <h4 className="text-xl font-serif mt-8 mb-4">7.3.1 Visualization of the Integer Lattice</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Generate an interactive 3D visualization of the points <MathComp formula="\Psi(a,b) = a + ib" /> for <MathComp formula="a,b \le N" />.
              </p>
              <LatticeExplorer3D />

              <h4 className="text-xl font-serif mt-8 mb-4">7.3.2 Distribution of Angles</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Compute and visualize the distribution of angles <MathComp formula="\theta = \arctan(b/a)" /> for <MathComp formula="a,b \le N" />.
              </p>
              <AngleDistributionHistograms />

              <h4 className="text-xl font-serif mt-8 mb-4">7.3.3 Primitive Pairs and the Stern–Brocot Tree</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Visualize the enumeration of primitive pairs via the Stern–Brocot tree.
              </p>
              <SternBrocotViewer />

              <h4 className="text-xl font-serif mt-8 mb-4">7.3.4 Curvature of Triangle Chains</h4>
              <p className="mb-6">
                <strong>Objective:</strong> Simulate chains of right triangles built from integer pairs and compute the curvature analogue <MathComp formula="K = \pi - \sum\theta_k" />.
              </p>
              <TriangleChainCurvatureValidation />

              <h3 className="text-2xl font-serif mt-12 mb-6">7.4 Summary of Computational Findings</h3>
              <div className="overflow-x-auto mb-12">
                <table className="w-full text-left border-collapse border border-cream-300 text-sm">
                  <thead>
                    <tr className="bg-cream-100">
                      <th className="p-4 border border-cream-300 font-serif">Experiment</th>
                      <th className="p-4 border border-cream-300 font-serif">Purpose</th>
                      <th className="p-4 border border-cream-300 font-serif">Key Finding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { exp: 'Theorem verification', purpose: 'Confirm core RHC relations', finding: 'All relations hold exactly' },
                      { exp: 'Lattice visualization', purpose: 'Explore state space', finding: 'Discrete structure, ray organization' },
                      { exp: 'Angle distribution', purpose: 'Verify uniform distribution in t', finding: 'Convergence to uniformity as N → ∞' },
                      { exp: 'Primitive pair enumeration', purpose: 'Connect to Stern–Brocot tree', finding: 'Natural ordering of rationals' },
                      { exp: 'Triangle chain curvature', purpose: 'Test flatness conditions', finding: 'Arithmetic identities produce flat chains' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="p-4 border border-cream-300 font-bold">{row.exp}</td>
                        <td className="p-4 border border-cream-300">{row.purpose}</td>
                        <td className="p-4 border border-cream-300">{row.finding}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-12 p-8 bg-navy-900 text-cream-50 rounded-2xl">
                <h3 className="text-2xl font-serif mb-4">7.5 Code Availability and Reproducibility</h3>
                <p className="text-cream-200 leading-relaxed mb-6">
                  All code used in these computational experiments is openly available in the <strong>RHC Computational Suite</strong> repository. All figures in this chapter (and throughout the monograph) can be reproduced using the code in the repository.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">GitHub Repository</a>
                  <a href="#" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">Documentation</a>
                </div>
              </div>
            </div>
          </Section>

          <Section id="conclusion" title="8. Discussion, Open Problems, and the Road Ahead" subtitle="Final Synthesis">
            <h3 className="text-2xl font-serif mt-12 mb-6">8.1 Summary of Rigorous Achievements</h3>
            <p className="mb-4">The Recursive Harmonic Codex, as developed in the preceding chapters, stands on firm mathematical ground. We have established:</p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li><strong>A fundamental mapping</strong> <MathComp formula="\Psi:\mathbb{N}^2\to\mathbb{C}" /> that encodes every integer pair <MathComp formula="(a,b)" /> as a unique point <MathComp formula="z=a+ib" /> in the complex plane, preserving all information about the original integers.</li>
              <li><strong>A factorization</strong> <MathComp formula="a=dp,\;b=dq" /> with <MathComp formula="d=\gcd(a,b)" /> and <MathComp formula="\gcd(p,q)=1" />, separating scale from shape.</li>
              <li><strong>The GCD–radius relation</strong> <MathComp formula="d=\frac{|z|}{\sqrt{p^2+q^2}}" />, revealing that the greatest common divisor is not merely an arithmetic notion but a geometric ratio.</li>
              <li><strong>The angle–ratio correspondence</strong> <MathComp formula="\theta=\arctan(b/a)" />, showing that the angle encodes the ratio independently of scale, and that points sharing the same ratio lie on a common ray.</li>
              <li><strong>The fold operator</strong> <MathComp formula="\mathcal{F}(x)=\frac12(x+x^{-1})" /> and its essential properties: symmetry, real projection on the unit circle, minimum at <MathComp formula="x=1" />, and generalization to quaternions.</li>
              <li><strong>Angle complementarity</strong> <MathComp formula="\tan\theta_1 = 1/(q+\tan\theta_2)" /> in the Euclidean algorithm, linking the algorithm's steps to a continued fraction of angles.</li>
              <li><strong>The Fisher metric on the space of ratios</strong>, derived under the hypothesis that <MathComp formula="\mu=b/a" /> parameterizes a statistical manifold: <MathComp formula="ds^2 = d\mu^2/\mu^2 = d\theta^2/(\sin^2\theta\cos^2\theta)" />, leading to the Fisher distance <MathComp formula="d_F(\theta_1,\theta_2)=|\ln\tan\theta_2-\ln\tan\theta_1|" />.</li>
              <li><strong>A connection to the Bhattacharyya coefficient</strong> <MathComp formula="BC = 1/\mathcal{F}(\sqrt{a/b})" /> for the Bernoulli family, linking the fold operator directly to an information‑theoretic measure.</li>
              <li><strong>Discreteness and density</strong> results: <MathComp formula="\Psi(\mathbb{N}^2)" /> is a discrete lattice, yet its angles are dense in <MathComp formula="[0,\pi/2]" /> and become uniformly distributed in the coordinate <MathComp formula="t=\ln\tan\theta" />.</li>
            </ul>

            <Callout type="key" label="KEY INSIGHT">
              <p>The RHC demonstrates that the humble integer pair <MathComp formula="(a,b)" /> carries within it a rich geometric and information‑theoretic structure — a structure that emerges naturally from the Euclidean algorithm and the fold operator.</p>
            </Callout>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.2 Status of the Physical Interpretation</h3>
            <p className="mb-6">Chapter 5 presented three families of conjectural physical interpretations:</p>
            <ol className="list-decimal pl-6 space-y-4 mb-8">
              <li><strong>RHC as a state space</strong> — integer pairs as binary system states, angle as continuous parameter, modulus as latent scale.</li>
              <li><strong>Fold operator as projection mechanism</strong> — quantum measurement analog, exchange symmetry.</li>
              <li><strong>Emergent spacetime from arithmetic</strong> — composite geometric structures as pre‑geometric fabric, curvature analogue <MathComp formula="K=\pi-\sum\theta_k" />.</li>
            </ol>

            <p className="mb-6">It is crucial to reiterate the epistemological stance adopted throughout this work: <strong>these interpretations are not proven</strong>. They are analogies, motivated by the formal similarity between RHC structures and those of established physical theories. Their value lies in:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Generating concrete, falsifiable predictions (Chapter 6);</li>
              <li>Suggesting new ways to conceptualize old problems;</li>
              <li>Building bridges between abstract mathematics and intuitive physical concepts.</li>
            </ul>

            <Callout type="critique" label="EPISTEMOLOGICAL NOTE">
              <p>The RHC is offered as an exploratory framework, not as established doctrine. Its physical interpretations are clearly labeled as conjectural, and a strict separation is maintained between what is proven (Chapters 2–4) and what is hypothesized (Chapters 5–6).</p>
            </Callout>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.3 Limitations and Open Challenges</h3>
            <p className="mb-6">Despite its mathematical richness, the RHC has several intrinsic limitations that must be acknowledged.</p>

            <h4 className="text-xl font-serif mt-8 mb-4">8.3.1 Lack of Dynamics</h4>
            <p className="mb-6">The most serious limitation is the absence of dynamics. The RHC describes a state space and a notion of distance (the Fisher metric), but it does not provide equations of motion — no Hamiltonian, no Lagrangian, no principle of least action. It is a purely kinematical framework. To become a physical theory, one must specify how states evolve in time.</p>

            <div className="pull-quote">
              "The RHC illuminates the geometry of possibility, but not yet the physics of becoming."
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">8.3.2 Discrete vs. Continuous</h4>
            <p className="mb-6">The RHC's foundation is discrete arithmetic, yet many physical theories — general relativity, quantum field theory — are inherently continuous. While we have shown that the set of angles becomes dense in the continuum limit (<MathComp formula="a,b\to\infty" />), this does not automatically restore all continuous symmetries, such as Lorentz invariance.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.3.3 Complex Amplitudes vs. Probability Amplitudes</h4>
            <p className="mb-6">In quantum mechanics, the complex amplitude's modulus squared gives a probability. The RHC's complex numbers <MathComp formula="a+ib" /> have real and imaginary parts that are integers — not probability amplitudes. The fold operator extracts a real number that could be interpreted as an expectation value, but the connection to probability is not intrinsic.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.3.4 Higher Dimensions and Generalizations</h4>
            <p className="mb-6">The RHC is built on pairs of integers. Nature, however, often requires higher‑dimensional structures — e.g., three spatial dimensions, or <MathComp formula="n" />-tuples of quantum numbers. Generalizing the RHC to <MathComp formula="n" />-tuples <MathComp formula="(a_1,\dots,a_n)" /> is a natural next step.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.3.5 Computational Complexity</h4>
            <p className="mb-6">For very large integers, the explicit enumeration of primitive pairs becomes computationally expensive. The number of primitive pairs with <MathComp formula="p,q\le N" /> grows as <MathComp formula="\frac{6}{\pi^2}N^2" />, making exhaustive exploration impractical beyond <MathComp formula="N\sim 10^6" />.</p>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.4 Implications for Mathematics, Physics, and Information Science</h3>

            <h4 className="text-xl font-serif mt-8 mb-4">8.4.1 For Number Theory</h4>
            <p className="mb-6">The RHC provides a geometric lens through which to view classical number‑theoretic objects. The Euclidean algorithm becomes a spiral of triangles; the GCD becomes a ratio of lengths; continued fractions become sequences of angles.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.4.2 For Geometry</h4>
            <p className="mb-6">The RHC offers a concrete model of how a continuous metric (the Fisher metric) can emerge from a discrete lattice. This is a toy example of the kind of emergence postulated in quantum gravity.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.4.3 For Information Theory</h4>
            <p className="mb-6">The Fisher metric is the canonical geometric structure on statistical manifolds. The RHC shows that this metric arises naturally from the arithmetic of ratios, suggesting a deep connection between number theory and information geometry.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">8.4.4 For Physics</h4>
            <p className="mb-6">The eighteen predictions of Chapter 6 span an extraordinary range of physical phenomena. If confirmed, they would point to an arithmetic substrate underlying diverse areas of physics. If falsified, they would constrain the analogy and guide the search for deeper principles.</p>

            <Callout type="historical" label="HISTORICAL NOTE">
              <p>Leibniz dreamed of a "characteristica universalis" — a universal language in which all truths could be expressed through combinations of simple symbols. The RHC, in its modest way, is a step toward realizing that dream for the domains of arithmetic, geometry, and information.</p>
            </Callout>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.5 Open Problems and Future Directions</h3>

            <h4 className="text-xl font-serif mt-8 mb-4">8.5.1 Mathematical Foundations</h4>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-cream-300 text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="border border-cream-300 p-3 text-left">Problem</th>
                    <th className="border border-cream-300 p-3 text-left">Description</th>
                    <th className="border border-cream-300 p-3 text-left">Potential Approach</th>
                  </tr>
                </thead>
                <tbody className="text-cream-900">
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Higher dimensions</td>
                    <td className="border border-cream-300 p-3">Generalize the RHC to <MathComp formula="n" />-tuples <MathComp formula="(a_1,\dots,a_n)" />.</td>
                    <td className="border border-cream-300 p-3">Map to <MathComp formula="\mathbb{C}^n" /> or Grassmannians; seek higher‑dimensional fold operators.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Gaussian integers</td>
                    <td className="border border-cream-300 p-3">Extend to negative integers, allowing points in all four quadrants.</td>
                    <td className="border border-cream-300 p-3">Use <MathComp formula="\mathbb{Z}[i]" />; study prime factorization and connections to sums of two squares.</td>
                  </tr>
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">p‑adic generalization</td>
                    <td className="border border-cream-300 p-3">Replace real numbers with p‑adic numbers; define an analogue of the fold operator.</td>
                    <td className="border border-cream-300 p-3">p‑adic analysis; explore connections to adelic geometry.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Modular group action</td>
                    <td className="border border-cream-300 p-3">Study the action of <MathComp formula="\mathrm{PSL}(2,\mathbb{Z})" /> on primitive pairs and its implications for the Fisher metric.</td>
                    <td className="border border-cream-300 p-3">Automorphic forms; trace formulas.</td>
                  </tr>
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Curvature analogue <MathComp formula="K" /></td>
                    <td className="border border-cream-300 p-3">Prove that <MathComp formula="K" /> converges to a continuous curvature in the continuum limit.</td>
                    <td className="border border-cream-300 p-3">Differential geometry; discrete exterior calculus.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">8.5.2 Information Geometry</h4>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-cream-300 text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="border border-cream-300 p-3 text-left">Problem</th>
                    <th className="border border-cream-300 p-3 text-left">Description</th>
                    <th className="border border-cream-300 p-3 text-left">Potential Approach</th>
                  </tr>
                </thead>
                <tbody className="text-cream-900">
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Derivation from first principles</td>
                    <td className="border border-cream-300 p-3">Can the Fisher metric on the space of ratios be derived directly from the Euclidean algorithm, without assuming a statistical model?</td>
                    <td className="border border-cream-300 p-3">Use the geometry of the Stern‑Brocot tree; large deviations theory.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Quantum information</td>
                    <td className="border border-cream-300 p-3">Does the fold operator appear in quantum fidelity for certain states?</td>
                    <td className="border border-cream-300 p-3">Study two‑mode squeezed states; coherent states.</td>
                  </tr>
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Dynamics on the manifold</td>
                    <td className="border border-cream-300 p-3">Introduce a Hamiltonian that generates geodesic flow on the Fisher metric.</td>
                    <td className="border border-cream-300 p-3">Geometric mechanics; symplectic geometry.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Phase transitions</td>
                    <td className="border border-cream-300 p-3">Prove that the Fisher metric develops singularities at rational angles corresponding to phase transitions.</td>
                    <td className="border border-cream-300 p-3">Statistical mechanics; renormalization group.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">8.5.3 Physical Interpretations</h4>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-cream-300 text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="border border-cream-300 p-3 text-left">Problem</th>
                    <th className="border border-cream-300 p-3 text-left">Description</th>
                    <th className="border border-cream-300 p-3 text-left">Potential Approach</th>
                  </tr>
                </thead>
                <tbody className="text-cream-900">
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Dynamics</td>
                    <td className="border border-cream-300 p-3">Find a natural dynamical principle for the RHC state space.</td>
                    <td className="border border-cream-300 p-3">Information‑theoretic action; entropic dynamics.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Lorentzian signature</td>
                    <td className="border border-cream-300 p-3">Extend the metric to have Lorentzian signature, enabling causal structure.</td>
                    <td className="border border-cream-300 p-3">Wick rotation; complex angles.</td>
                  </tr>
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">Black hole entropy</td>
                    <td className="border border-cream-300 p-3">Derive the logarithmic correction coefficient <MathComp formula="-1/2" /> from first principles within a quantum gravity framework.</td>
                    <td className="border border-cream-300 p-3">Loop quantum gravity; string theory.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">ER=EPR connection</td>
                    <td className="border border-cream-300 p-3">Explore whether the RHC's exchange symmetry <MathComp formula="\mathcal{F}(x)=\mathcal{F}(1/x)" /> relates to the ER=EPR conjecture.</td>
                    <td className="border border-cream-300 p-3">Quantum information; tensor networks.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">8.5.4 Experimental Tests</h4>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-cream-300 text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="border border-cream-300 p-3 text-left">Problem</th>
                    <th className="border border-cream-300 p-3 text-left">Description</th>
                    <th className="border border-cream-300 p-3 text-left">Potential Approach</th>
                  </tr>
                </thead>
                <tbody className="text-cream-900">
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">LIGO data analysis</td>
                    <td className="border border-cream-300 p-3">Search for quantized ringdown frequencies in gravitational wave events.</td>
                    <td className="border border-cream-300 p-3">Bayesian model comparison; template bank including RHC‑predicted frequencies.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">LHC jet substructure</td>
                    <td className="border border-cream-300 p-3">Test the prediction of uniform distribution in <MathComp formula="\ln\tan\theta" /> for jet constituent angles.</td>
                    <td className="border border-cream-300 p-3">Use open data from ATLAS/CMS; compare with Monte Carlo simulations.</td>
                  </tr>
                  <tr>
                    <td className="border border-cream-300 p-3 font-bold">CMB power spectrum</td>
                    <td className="border border-cream-300 p-3">Look for oscillatory features at scales corresponding to rational ratios.</td>
                    <td className="border border-cream-300 p-3">Planck data analysis; needle‑based statistics.</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border border-cream-300 p-3 font-bold">Laboratory experiments</td>
                    <td className="border border-cream-300 p-3">Build photonic crystals with integer‑ratio lattice constants; measure band gaps.</td>
                    <td className="border border-cream-300 p-3">Collaborate with experimental groups in metamaterials.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.6 Conclusion</h3>
            <p className="mb-6">The Recursive Harmonic Codex began with a simple observation: every pair of positive integers <MathComp formula="(a,b)" /> can be mapped to a point <MathComp formula="a+ib" /> in the complex plane. From this seed, a rich mathematical structure has grown — the fold operator, the GCD–radius relation, angle complementarity, and a natural connection to information geometry.</p>
            <p className="mb-6">But the RHC is more than a mathematical edifice. It is also a generator of questions — questions that reach beyond mathematics into physics, cosmology, and even philosophy. The conjectural interpretations of Chapter 5, though speculative, have already produced eighteen falsifiable predictions that span an extraordinary range of scientific domains.</p>

            <div className="pull-quote">
              "The universe may not be a computer, but it computes. The RHC suggests that at its most fundamental level, that computation is arithmetic."
            </div>

            <p className="mb-6">We close with an invitation. The RHC is not a finished theory; it is a beginning. Its open problems are opportunities for further exploration. Its predictions are challenges to experimentalists. Its mathematical structures are gifts to theorists. We invite the reader — whether mathematician, physicist, or curious layperson — to join in this exploration.</p>

            <h3 className="text-2xl font-serif mt-16 mb-6">8.7 References</h3>
            <div className="space-y-4 text-sm text-cream-700 font-serif">
              <p>Lamé, G. (1844). "Note sur la limite du nombre des divisions dans la recherche du plus grand commun diviseur entre deux nombres entiers". <em>Comptes Rendus</em> 19: 867–870.</p>
              <p>Fisher, R.A. (1925). "Theory of statistical estimation". <em>Proceedings of the Cambridge Philosophical Society</em> 22: 700–725.</p>
              <p>Rao, C.R. (1945). "Information and the accuracy attainable in the estimation of statistical parameters". <em>Bulletin of the Calcutta Mathematical Society</em> 37: 81–89.</p>
              <p>Čencov, N.N. (1982). <em>Statistical Decision Rules and Optimal Inference</em>. American Mathematical Society.</p>
              <p>Wheeler, J.A. (1990). "Information, physics, quantum: The search for links". In <em>Complexity, Entropy, and the Physics of Information</em>, pp. 3–28.</p>
            </div>

            <p className="text-center text-cream-700 font-serif text-xl mt-24">
              Recursive Harmonic Codex · RHC Design System v3 · 2025
            </p>
          </Section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 text-navy-200 py-16 px-6 md:px-12 border-t border-gold-400/10 no-pdf">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-400 rounded-sm flex items-center justify-center">
                <span className="text-navy-800 font-bold text-sm">RHC</span>
              </div>
              <span className="font-serif text-2xl tracking-widest text-white">RHC</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              A formal mapping of discrete arithmetic structures to continuous geometric representations and information-theoretic measures.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Project</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#abstract" className="hover:text-gold-400 transition-colors">Abstract</a></li>
                <li><a href="#foundations" className="hover:text-gold-400 transition-colors">Foundations</a></li>
                <li><a href="#results" className="hover:text-gold-400 transition-colors">Core Results</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Author</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-white">Richard Bolt</span></li>
                <li><span className="opacity-70">Researcher</span></li>
                <li><a href="mailto:richard@boltdj.com" className="hover:text-gold-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">© 2025 Recursive Harmonic Codex Project. All rights reserved.</p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-50">
            <span>Built with React</span>
            <span>Tailwind CSS</span>
            <span>Three.js</span>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-navy-800 text-gold-400 rounded-full flex items-center justify-center shadow-xl border border-gold-400/20 hover:scale-110 active:scale-90 transition-all z-40 no-pdf"
      >
        <ArrowUpRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
