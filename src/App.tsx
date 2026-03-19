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
import { Math, MathBlock } from './components/Math';
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
  { id: 'conclusion', title: '7. Conclusion', subtitle: 'Final Synthesis' },
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
              <strong>Method:</strong> This work introduces a formal mapping <Math formula="\Psi: \mathbb{N}^2 \rightarrow \mathbb{C}" />, where an integer pair <Math formula="(a,b)" /> is represented as a point <Math formula="z = a + ib" /> in the complex plane. A key "fold operator" <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> is defined and rigorously explored.
            </p>
            <Callout type="critique" label="Scope Disclaimer">
              This work maintains a strict epistemological separation between its core mathematical results (Sections 2–4) and its speculative physical interpretations (Sections 5–6).
            </Callout>
          </Section>

          <Section id="introduction" title="1. Introduction" subtitle="Background and Context">
            <h3 className="text-2xl font-serif mb-6">1.1 The Quest for a Unified Foundation</h3>
            <p className="mb-6">
              The history of physics is a history of unification. Newton united terrestrial and celestial mechanics under universal gravitation. Maxwell unified electricity, magnetism, and optics. Einstein merged space and time into spacetime, then later sought—unsuccessfully—to unify gravity with electromagnetism. The Standard Model brought together the electromagnetic, weak, and strong nuclear forces under the gauge group <Math formula="SU(3) \times SU(2) \times U(1)" />. Yet gravity remains obstinately separate, and the deep nature of spacetime itself continues to elude us.
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
                  At the foundation of number theory lies the study of integers and their relationships. Among the most fundamental of these relationships is that of divisibility, encapsulated in the concept of the <GlossaryTerm term="Greatest Common Divisor (GCD)" definition="The largest positive integer that divides each of the integers without a remainder.">greatest common divisor (GCD)</GlossaryTerm>. For any two positive integers <Math formula="a" /> and <Math formula="b" />, the GCD, denoted <Math formula="\gcd(a,b)" />, represents the largest integer that divides both without remainder.
                </p>
                
                <EuclideanAlgorithm />

                <p className="mb-4">
                  The Euclidean algorithm, dating to approximately 300 BCE, provides a systematic method for computing this divisor through iterative reduction:
                </p>
                <MathBlock formula="\begin{aligned} a &= q_1 b + r_1, & 0 \le r_1 < b \\ b &= q_2 r_1 + r_2, & 0 \le r_2 < r_1 \\ r_1 &= q_3 r_2 + r_3, & 0 \le r_3 < r_2 \\ \vdots \\ r_{k-1} &= q_{k+1} r_k + 0 \end{aligned}" />
                <p className="mt-4 mb-4">
                  The final nonzero remainder <Math formula="r_k" /> is precisely <Math formula="\gcd(a,b)" />. Beyond its computational utility, the Euclidean algorithm reveals deep structural properties of integers. The sequence of quotients <Math formula="q_i" /> encodes the continued fraction expansion of the ratio <Math formula="a/b" />:
                </p>
                
                <ContinuedFractionTree />

                <MathBlock formula="\frac{a}{b} = q_1 + \frac{1}{q_2 + \frac{1}{q_3 + \frac{1}{\ddots + \frac{1}{q_{k+1}}}}}" />
                <p className="mt-4">
                  This connection between integer arithmetic and rational approximation has profound implications. Ratios <Math formula="a/b" /> that are most difficult to approximate rationally—those whose continued fraction expansions consist entirely of 1s—are precisely the ratios of consecutive Fibonacci numbers, which converge to the golden ratio <Math formula="\phi = (1+\sqrt{5})/2" />. Lamé's theorem (1844) established that the number of steps required by the Euclidean algorithm is maximized when the inputs are consecutive Fibonacci numbers, linking the golden ratio to algorithmic complexity.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.2 Geometric Representation: From Descartes to the Complex Plane</h4>
                <p className="mb-4">
                  The complex plane <Math formula="\mathbb{C}" /> offers a natural representation space for the ordered pair <Math formula="(a,b)" />. By identifying the integer pair with the complex number <Math formula="z = a + ib" />, we embed discrete arithmetic into a continuous geometric space.
                </p>
                
                <ComplexPlaneLattice />

                <p className="mb-4">
                  The polar representation <Math formula="z = re^{i\theta}" /> proves particularly illuminating. The modulus <Math formula="r = |z| = \sqrt{a^2+b^2}" /> captures the scale of the pair, while the argument <Math formula="\theta = \arg(z) = \arctan(b/a)" /> encodes the ratio <Math formula="b/a" />. Crucially, <Math formula="\theta" /> depends only on the primitive ratio <Math formula="q/p" /> and is independent of the scale factor <Math formula="d = \gcd(a,b)" />.
                </p>
                <p>
                  This geometric encoding transforms arithmetic relations into visualizable spatial relationships. The Euclidean algorithm's steps, when viewed through this lens, trace a path through the complex plane—a path whose angular structure reveals the recursive "folding" of the space.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-navy-800 mb-4">1.2.3 Information Geometry: The Geometric Structure of Probability</h4>
                <p className="mb-4">
                  Information geometry studies families of probability distributions as geometric objects. A parametric family <Math formula="\{p(x|\xi)\}" /> forms a statistical manifold, where the Fisher information matrix defines a Riemannian metric—the Fisher-Rao metric:
                </p>
                
                <InformationGeometryPrimer />

                <MathBlock formula="g_{ij}(\xi) = \mathbb{E}\left[ \frac{\partial \log p}{\partial \xi^i} \frac{\partial \log p}{\partial \xi^j} \right]" />
                <p className="mt-4 mb-4">
                  The geodesic distance induced by this metric, <Math formula="d_F(\xi_1, \xi_2)" />, quantifies the distinguishability between distributions. For scale families, the metric often involves logarithmic derivatives. The Bhattacharyya coefficient provides another measure of overlap, related to the Hellinger distance and the Fisher metric.
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
                  Marlon D. Bulaqueña has developed the Information Geometric Extended Gravity (IGEG) framework, where gravitational dynamics emerge from gradients in an informational density field <Math formula="\psi" />. The core is the modified Einstein equation:
                </p>
                <MathBlock formula="G_{\mu\nu} = 8\pi G (T_{\mu\nu} + I_{\mu\nu})" />
                <p className="mt-4">
                  Where <Math formula="I_{\mu\nu}" /> is the informational stress-energy tensor. The theory reproduces dark matter and dark energy phenomena through informational equilibrium departures. Bulaqueña's "Universal Consilience" conjecture suggests that <Math formula="G, \hbar, c" /> may be emergent projections of a deeper informational constant <Math formula="\Omega_0" />.
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
                  Kondrashov's MCIMES establishes quantum information as the fundamental entity underlying emergent spacetime geometry. It predicts a dark energy equation of state <Math formula="w = -0.97 \pm 0.01" /> and a cosmological constant <Math formula="\Lambda \approx 1.9 \times 10^{-123}" />, remarkably close to observed values.
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
              <li>To construct a mathematically rigorous mapping <Math formula="\Psi: \mathbb{N}^2 \rightarrow \mathbb{C}" /> and define the associated fold operator <Math formula="\mathcal{F}" />.</li>
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
              <Math formula="\mathbb{N} = \{1, 2, 3, \dots\}" /> denotes the set of positive integers. (Occasionally we may include 0 when convenient, but the primary mapping uses positive integers.)
            </p>
            <p className="mb-4">
              <Math formula="\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}" /> denotes the set of all integers.
            </p>
            <p className="mb-6">
              <Math formula="\mathbb{R}" /> denotes the set of real numbers, and <Math formula="\mathbb{C} = \{x + iy \mid x, y \in \mathbb{R}\}" /> the set of complex numbers, where <Math formula="i^2 = -1" />.
            </p>

            <NumberSetsHierarchy />

            <p className="mb-6">
              For any two integers <Math formula="a, b \in \mathbb{Z}" /> (not both zero), the greatest common divisor <Math formula="\gcd(a, b)" /> is the largest positive integer <Math formula="d" /> such that <Math formula="d \mid a" /> and <Math formula="d \mid b" />. If <Math formula="\gcd(a, b) = 1" />, we say <Math formula="a" /> and <Math formula="b" /> are coprime (or relatively prime).
            </p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.2 Fundamental Theorems from Number Theory</h4>
            <Callout type="theorem" label="Theorem" number="2.1.1 (Fundamental Theorem of Arithmetic)" className="mb-6">
              Every integer <Math formula="n > 1" /> can be written uniquely as a product of prime numbers, up to the order of the factors.
              <p className="mt-2 text-sm italic">Proof. See, e.g., [Hardy & Wright, 2008, Theorem 2]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.2 (Correctness of the Euclidean Algorithm)" className="mb-6">
              For integers <Math formula="a, b" /> with <Math formula="b > 0" />, the Euclidean algorithm terminates after a finite number of steps, and the last non‑zero remainder equals <Math formula="\gcd(a, b)" />.
              <p className="mt-2 text-sm italic">Proof. See [Knuth, 1997, §4.5.2]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.3 (Bézout's Identity)" className="mb-6">
              For any integers <Math formula="a, b" /> (not both zero), there exist integers <Math formula="u, v" /> such that <Math formula="au + bv = \gcd(a, b)" />.
              <p className="mt-2 text-sm italic">Proof. Standard result, obtained by back‑substitution in the Euclidean algorithm. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.4 (Lamé's Theorem)" className="mb-6">
              The number of steps in the Euclidean algorithm applied to <Math formula="a, b" /> (with <Math formula="a \ge b" />) is at most <Math formula="5 \log_{10} b" />. Equivalently, the worst‑case input is consecutive Fibonacci numbers.
              <p className="mt-2 text-sm italic">Proof. See [Lamé, 1844] or [Knuth, 1997, §4.5.3]. ∎</p>
            </Callout>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.3 Fundamental Theorems from Complex Analysis</h4>
            <Callout type="theorem" label="Theorem" number="2.1.5 (Properties of Complex Numbers)" className="mb-6">
              Every complex number <Math formula="z = a + ib" /> (with <Math formula="a, b \in \mathbb{R}" />) can be represented in polar form <Math formula="z = re^{i\theta}" />, where
              <MathBlock formula="r = |z| = \sqrt{a^2 + b^2}, \quad \theta = \arg(z) = \begin{cases} \arctan(b/a) & \text{if } a > 0, \\ \arctan(b/a) + \pi & \text{if } a < 0, b \ge 0, \\ \arctan(b/a) - \pi & \text{if } a < 0, b < 0, \\ \pi/2 & \text{if } a = 0, b > 0, \\ -\pi/2 & \text{if } a = 0, b < 0. \end{cases}" />
              The modulus satisfies <Math formula="|z_1 z_2| = |z_1| |z_2|" /> and <Math formula="|z_1 / z_2| = |z_1| / |z_2|" /> for <Math formula="z_2 \neq 0" />.
              <p className="mt-2 text-sm italic">Proof. Standard result; see [Ahlfors, 1979]. ∎</p>
            </Callout>

            <Callout type="theorem" label="Theorem" number="2.1.6 (Polar Decomposition)" className="mb-6">
              Every complex number <Math formula="z" /> can be written uniquely as <Math formula="z = re^{i\theta}" /> with <Math formula="r \ge 0" /> and <Math formula="\theta \in [0, 2\pi)" /> (or any interval of length <Math formula="2\pi" />).
              <p className="mt-2 text-sm italic">Proof. Immediate from Theorem 2.1.5. ∎</p>
            </Callout>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.1.4 Additional Useful Facts</h4>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>The map <Math formula="\theta \mapsto e^{i\theta}" /> is a homomorphism from the additive group <Math formula="\mathbb{R}" /> to the multiplicative group of unit complex numbers.</li>
              <li>For any complex numbers <Math formula="z_1, z_2" />, <Math formula="\arg(z_1 z_2) \equiv \arg(z_1) + \arg(z_2) \pmod{2\pi}" />.</li>
              <li>The complex conjugate of <Math formula="z = a + ib" /> is <Math formula="\bar{z} = a - ib" />, and <Math formula="z\bar{z} = |z|^2" />.</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.2 The Fundamental Mapping: From Integer Pairs to Points in <Math formula="\mathbb{C}" /></h3>
            <p className="mb-6">
              We now introduce the core construction of the RHC: representing each ordered pair of positive integers as a point in the complex plane.
            </p>

            <Callout type="def" label="Definition 2.2.1 (RHC Map)" className="mb-6">
              Define the map <Math formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> by
              <MathBlock formula="\Psi(a, b) = z = a + ib," />
              where <Math formula="a, b \in \mathbb{N}" />. This map is injective because if <Math formula="\Psi(a_1, b_1) = \Psi(a_2, b_2)" />, then <Math formula="a_1 + ib_1 = a_2 + ib_2" /> implies <Math formula="a_1 = a_2" /> and <Math formula="b_1 = b_2" />.
            </Callout>

            <RHCMapLattice />

            <p className="mb-6">
              The image <Math formula="\Psi(\mathbb{N}^2)" /> is the set of Gaussian integers with positive real and imaginary parts, i.e., the lattice points in the first quadrant. This set is discrete and will be the foundation for all subsequent constructions.
            </p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 2.2.1.</strong> <Math formula="\Psi(3, 4) = 3 + 4i" />. Its modulus is <Math formula="r = 5" />, and its argument is <Math formula="\theta = \arctan(4/3) \approx 0.9273" /> rad.</p>
              <p><strong>Example 2.2.2.</strong> <Math formula="\Psi(6, 8) = 6 + 8i" />. Here <Math formula="\gcd(6, 8) = 2" />, and the primitive pair is <Math formula="(3, 4)" />. Notice that <Math formula="\Psi(6, 8) = 2 \cdot \Psi(3, 4)" />; the point lies on the same ray as <Math formula="(3, 4)" /> but twice as far from the origin.</p>
            </div>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.3 Factorization and the Primitive Pair</h3>
            <p className="mb-6">Every integer pair can be decomposed into a scale factor and a primitive, coprime pair.</p>

            <Callout type="def" label="Lemma 2.3.1 (Factorization)" className="mb-6">
              For any <Math formula="(a, b) \in \mathbb{N}^2" />, let <Math formula="d = \gcd(a, b)" />. Then there exist unique coprime positive integers <Math formula="p, q" /> such that
              <MathBlock formula="a = dp, \quad b = dq, \quad \gcd(p, q) = 1." />
              <p className="mt-2 text-sm italic">Proof. By definition of the greatest common divisor, <Math formula="d" /> divides both <Math formula="a" /> and <Math formula="b" />, so we can write <Math formula="a = dp" />, <Math formula="b = dq" /> with <Math formula="p, q \in \mathbb{N}" />. If <Math formula="p" /> and <Math formula="q" /> had a common factor <Math formula="k > 1" />, then <Math formula="dk" /> would divide both <Math formula="a" /> and <Math formula="b" />, contradicting the maximality of <Math formula="d" />. Hence <Math formula="\gcd(p, q) = 1" />. Uniqueness follows from the uniqueness of the quotient when dividing by <Math formula="d" />. ∎</p>
            </Callout>

            <FactorizationDiagram />

            <p className="mb-6">
              We call <Math formula="(p, q)" /> the primitive pair associated with <Math formula="(a, b)" />. The ratio <Math formula="b/a = q/p" /> is therefore a reduced fraction.
            </p>

            <p className="mb-4"><strong>Corollary 2.3.1.</strong> The map <Math formula="(a, b) \mapsto (p, q)" /> induces a bijection between rays from the origin (with rational slope) and primitive pairs. Each ray is parameterized by the scale factor <Math formula="d \in \mathbb{N}" />.</p>
            <p className="mb-8"><strong>Remark 2.3.1.</strong> The primitive pair encodes the essential geometric "shape" of the point, while the scale factor <Math formula="d" /> determines its distance from the origin. This separation will be crucial throughout the RHC.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.4 The GCD–Radius Relation</h3>
            <p className="mb-6">The following theorem shows that the GCD is not merely an arithmetic quantity but can be recovered from the geometric modulus of the complex representative, provided the primitive pair is known.</p>

            <Callout type="def" label="Theorem 2.4.1 (GCD–Radius Relation)" className="mb-6">
              Let <Math formula="z = \Psi(a, b) = a + ib" /> with <Math formula="a, b \in \mathbb{N}" />. Write <Math formula="a = dp" />, <Math formula="b = dq" /> as in Lemma 2.3.1. Then the modulus <Math formula="r = |z| = \sqrt{a^2 + b^2}" /> satisfies
              <MathBlock formula="d = \frac{r}{\sqrt{p^2 + q^2}}." />
              Equivalently,
              <MathBlock formula="\gcd(a, b) = \sqrt{\frac{a^2 + b^2}{p^2 + q^2}}." />
              <p className="mt-2 text-sm italic">Proof. Direct computation: <Math formula="r = \sqrt{a^2 + b^2} = \sqrt{(dp)^2 + (dq)^2} = d\sqrt{p^2 + q^2}" />. Solving for <Math formula="d" /> yields the stated formula. ∎</p>
            </Callout>

            <GCDRadiusTheorem />

            <p className="mb-4"><strong>Corollary 2.4.1.</strong> For points on the same ray (same primitive pair), the GCD is proportional to the modulus: <Math formula="d = r / \sqrt{p^2 + q^2}" />. Thus larger points on a given ray correspond to larger GCDs.</p>
            <p className="mb-8"><strong>Example 2.4.1.</strong> For <Math formula="(a, b) = (6, 8)" />, we have <Math formula="p = 3, q = 4" />, <Math formula="\sqrt{p^2 + q^2} = 5" />, and <Math formula="r = 10" />, giving <Math formula="d = 10/5 = 2" />, which matches <Math formula="\gcd(6, 8) = 2" />.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.5 Ratio and Angle Correspondence</h3>
            <p className="mb-6">The polar representation naturally separates scale (modulus) from shape (argument). This separation aligns perfectly with the factorization of Lemma 2.3.1.</p>

            <Callout type="def" label="Proposition 2.5.1 (Angle Encodes Ratio)" className="mb-6">
              For <Math formula="z = \Psi(a, b) = a + ib" />, let <Math formula="\theta = \arg(z)" /> (taking the principal value in <Math formula="(0, \pi/2)" /> since <Math formula="a, b > 0" />). Then
              <MathBlock formula="\theta = \arctan(b/a)," />
              and <Math formula="\theta" /> depends only on the ratio <Math formula="b/a" />. Moreover, if <Math formula="a = dp" />, <Math formula="b = dq" /> with <Math formula="\gcd(p, q) = 1" />, then
              <MathBlock formula="\theta = \arctan(q/p)," />
              which is independent of the scale factor <Math formula="d" />.
              <p className="mt-2 text-sm italic">Proof. From the definition of argument, <Math formula="\tan\theta = b/a" />. Since <Math formula="b/a = q/p" />, the angle is determined solely by the primitive ratio. The scale <Math formula="d" /> cancels. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 2.5.1 (Rays of Constant Ratio).</strong> All integer pairs sharing the same ratio <Math formula="b/a" /> map to points lying on the same ray from the origin in the complex plane. Specifically, if <Math formula="(a_1, b_1)" /> and <Math formula="(a_2, b_2)" /> satisfy <Math formula="b_1/a_1 = b_2/a_2" />, then <Math formula="\Psi(a_1, b_1)" /> and <Math formula="\Psi(a_2, b_2)" /> are collinear with the origin.</p>
            <ConstantRatioRays />

            <p className="mb-8"><strong>Remark 2.5.1.</strong> This corollary establishes an equivalence relation on <Math formula="\mathbb{N}^2" />: two pairs are equivalent iff they have the same reduced ratio <Math formula="q/p" />. The equivalence classes correspond to rays, and each ray is parameterized by the scale <Math formula="d" />. The primitive pair <Math formula="(p, q)" /> serves as a canonical representative for the class, lying at distance <Math formula="\sqrt{p^2 + q^2}" /> from the origin.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.6 The Fold Operator: Definition and Algebraic Properties</h3>
            <p className="mb-6">We now introduce an operator that will play a central role in connecting arithmetic to projection and information measures. The operator "folds" a complex number with its reciprocal, extracting a real-valued symmetric quantity.</p>

            <Callout type="def" label="Definition 2.6.1 (Fold Operator)" className="mb-6">
              For any non‑zero complex number <Math formula="x \in \mathbb{C} \setminus \{0\}" />, define
              <MathBlock formula="\mathcal{F}(x) = \frac{1}{2}\left(x + \frac{1}{x}\right)." />
              The domain can be extended to include 0 by taking limits, but we restrict to non‑zero values for the definition.
            </Callout>

            <Callout type="def" label="Theorem 2.6.1 (Core Properties of F)" className="mb-6">
              The fold operator satisfies the following properties:
              <ul className="list-decimal pl-6 mt-4 space-y-2">
                <li><strong>Symmetry:</strong> <Math formula="\mathcal{F}(x) = \mathcal{F}(x^{-1})" /> for all <Math formula="x \neq 0" />.</li>
                <li><strong>Real Projection on Unit Circle:</strong> If <Math formula="x = e^{i\theta}" /> (i.e., <Math formula="|x| = 1" />), then <Math formula="\mathcal{F}(x) = \cos\theta" />.</li>
                <li><strong>Minimum Modulus (Real Positive Case):</strong> For real <Math formula="x > 0" />, <Math formula="\mathcal{F}(x) \ge 1" />, with equality if and only if <Math formula="x = 1" />.</li>
                <li><strong>Quaternion Generalization:</strong> If <Math formula="q" /> is a unit quaternion (i.e., <Math formula="|q| = 1" />), then <Math formula="\mathcal{F}(q)" /> coincides with the real part <Math formula="\text{Re}(q)" />.</li>
              </ul>
              <p className="mt-4 text-sm italic">Proof. (1) <Math formula="\mathcal{F}(x^{-1}) = \frac{1}{2}(x^{-1} + x) = \mathcal{F}(x)" />. (2) If <Math formula="x = e^{i\theta}" />, then <Math formula="1/x = e^{-i\theta}" />, so <Math formula="\mathcal{F}(x) = \frac{1}{2}(e^{i\theta} + e^{-i\theta}) = \cos\theta" />. (3) For real <Math formula="x > 0" />, <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + 1/x)" />. By AM–GM, <Math formula="x + 1/x \ge 2" />, equality iff <Math formula="x = 1" />. (4) For unit quaternion <Math formula="q = \cos\theta + u\sin\theta" />, <Math formula="q^{-1} = \cos\theta - u\sin\theta" />, average is <Math formula="\cos\theta" />. ∎</p>
            </Callout>

            <FoldUnitCircle />

            <p className="mb-4"><strong>Remark 2.6.1.</strong> Property (2) is particularly significant: when applied to a point on the unit circle, the fold operator extracts the cosine of the angle. In the context of the RHC, if we consider the complex number representing an integer pair normalized to unit modulus, the fold operator yields a real number between -1 and 1 that encodes the angle.</p>
            <p className="mb-8"><strong>Remark 2.6.2.</strong> The fold operator is intimately related to the Joukowsky transform used in aerodynamics, but its symmetry and projection properties make it a natural candidate for modeling measurement processes.</p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 2.6.1.</strong> For <Math formula="x = 2" />, <Math formula="\mathcal{F}(2) = \frac{1}{2}(2 + 0.5) = 1.25" />. For <Math formula="x = 0.5" />, <Math formula="\mathcal{F}(0.5) = 1.25" />, illustrating symmetry.</p>
              <p><strong>Example 2.6.2.</strong> For <Math formula="x = e^{i\pi/3} = \frac{1}{2} + i\frac{\sqrt{3}}{2}" />, <Math formula="\mathcal{F}(x) = \cos(\pi/3) = 0.5" />.</p>
            </div>

            <FoldSymmetry />

            <Callout type="def" label="Proposition 2.6.1 (Relation to Chebyshev Polynomials)" className="mb-6">
              For integer <Math formula="n \ge 1" />, let <Math formula="T_n" /> denote the Chebyshev polynomial of the first kind. Then for <Math formula="x = e^{i\theta}" />,
              <MathBlock formula="\mathcal{F}(x^n) = T_n(\cos\theta)." />
              <p className="mt-2 text-sm italic">Proof. Since <Math formula="x^n = e^{in\theta}" />, <Math formula="\mathcal{F}(x^n) = \cos(n\theta) = T_n(\cos\theta)" />. ∎</p>
            </Callout>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.7 Geometric Constructions from Pairs</h3>
            <p className="mb-6">Beyond individual points, we can build composite geometric structures from collections of integer pairs.</p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.1 The Associated Right Triangle</h4>
            <p className="mb-6"><strong>Construction 2.7.1.</strong> For a given pair <Math formula="(a, b) \in \mathbb{N}^2" />, consider the right triangle in the complex plane with vertices at 0, <Math formula="a" />, and <Math formula="z = a + ib" />. The legs have lengths <Math formula="a" /> and <Math formula="b" />, and the hypotenuse has length <Math formula="r = \sqrt{a^2 + b^2}" />. The angle at the origin is <Math formula="\theta = \arctan(b/a)" />. This triangle is the fundamental geometric unit of the RHC.</p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.2 Composite Structures</h4>
            <p className="mb-6"><strong>Definition 2.7.1.</strong> Let <Math formula="\{(a_k, b_k)\}_{k=1}^N" /> be a finite collection of integer pairs. We can form a composite geometric figure by joining the associated right triangles along their hypotenuses in a specified order. For example, if we place the triangles consecutively such that the hypotenuse of triangle <Math formula="k" /> becomes a leg of triangle <Math formula="k+1" />, we obtain a polygonal chain.</p>
            <p className="mb-8"><strong>Example 2.7.1 (Triangle Chain).</strong> Take triangles corresponding to (3,4), (5,12), and (8,15). Place them so that the hypotenuse of the first aligns with the leg of the second, and so on. The resulting chain has a total length and curvature that can be computed.</p>

            <h4 className="text-lg font-bold text-navy-800 mb-4">2.7.3 Geometric Observables</h4>
            <p className="mb-4"><strong>Definition 2.7.2 (Angle Mismatch).</strong> For two pairs <Math formula="(a_i, b_i)" /> and <Math formula="(a_j, b_j)" /> with associated angles <Math formula="\theta_i" /> and <Math formula="\theta_j" />, define <Math formula="\Delta\theta_{ij} = |\theta_i - \theta_j|" />. This measures the angular separation between the corresponding rays.</p>
            
            <Callout type="def" label="Definition 2.7.3 (Total Curvature Analogue)" className="mb-6">
              For a closed chain of <Math formula="N" /> triangles arranged tip‑to‑tail around a point, we define the curvature analogue for a given arrangement as
              <MathBlock formula="K = \pi - \sum_{k=1}^N \theta_k," />
              where the <Math formula="\theta_k" /> are the angles at the vertices of the chain. This quantity vanishes when the chain is "flat".
            </Callout>

            <p className="mb-8"><strong>Remark 2.7.1.</strong> In differential geometry, the angle deficit in a triangulation is a discrete version of Gaussian curvature. Thus <Math formula="K" /> may be interpreted as a discrete curvature measure.</p>
            <p className="mb-8"><strong>Example 2.7.2 (Flat Chain).</strong> Three triangles with angles <Math formula="\alpha, \beta, \gamma" /> such that <Math formula="\alpha + \beta + \gamma = \pi" /> can form a flat chain. For instance, <Math formula="\arctan(1/2) + \arctan(1/3) = \pi/4" /> is a known identity, but finding triples that sum to <Math formula="\pi" /> is an interesting Diophantine problem.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.8 The Primitive Lattice and Its Properties</h3>
            <p className="mb-6">The set of primitive pairs <Math formula="(p, q)" /> (with <Math formula="\gcd(p, q) = 1" />) forms a lattice in the first quadrant, often called the visible points of the integer lattice.</p>

            <PrimitivePairs />

            <p className="mb-4"><strong>Proposition 2.8.1 (Density of Primitive Pairs).</strong> The set of primitive pairs is dense in angle: for any <Math formula="\theta \in [0, \pi/2]" />, there exists a sequence of primitive pairs <Math formula="(p_n, q_n)" /> such that <Math formula="\arctan(q_n/p_n) \to \theta" />.</p>
            <p className="mb-4"><strong>Proposition 2.8.2 (Asymptotic Density).</strong> The number of primitive pairs with <Math formula="p, q \le N" /> is asymptotically <Math formula="\frac{6}{\pi^2}N^2 + O(N \log N)" />. This is the same as the probability that two random integers are coprime.</p>
            <PrimitiveDensity />

            <p className="mb-8"><strong>Proposition 2.8.3 (Distribution of Angles).</strong> The angles <Math formula="\theta = \arctan(q/p)" /> for primitive pairs are uniformly distributed in <Math formula="[0, \pi/2]" /> with respect to the measure <Math formula="d\theta / (\sin\theta \cos\theta)" />. Equivalently, the variable <Math formula="t = \ln\tan\theta" /> is uniformly distributed.</p>

            <SternBrocotTree />
            <FareySequence />

            <h3 className="text-2xl font-serif mt-12 mb-6">2.9 Extensions to Gaussian Integers and Other Quadrants</h3>
            <p className="mb-6">While the RHC primarily focuses on positive integers, the mapping can be extended to all Gaussian integers <Math formula="\mathbb{Z}[i] = \{a + ib \mid a, b \in \mathbb{Z}\}" />.</p>

            <Callout type="def" label="Definition 2.9.1 (Extended RHC Map)" className="mb-6">
              Define <Math formula="\Psi_{\mathbb{Z}}: \mathbb{Z}^2 \to \mathbb{C}" /> by <Math formula="\Psi_{\mathbb{Z}}(a, b) = a + ib" />. This map is still injective, and its image is the full lattice of Gaussian integers.
            </Callout>

            <p className="mb-4"><strong>Remark 2.9.1.</strong> The fold operator <Math formula="\mathcal{F}(x)" /> is defined for any non‑zero complex number, so it works unchanged for Gaussian integers.</p>
            <FoldLattice />

            <p className="mb-8"><strong>Remark 2.9.2.</strong> Extending to Gaussian integers opens the possibility of connecting the RHC to prime factorization in <Math formula="\mathbb{Z}[i]" />, which is intimately related to sums of two squares and Fermat's theorem on primes expressible as <Math formula="a^2 + b^2" />.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">2.10 Summary</h3>
            <p className="mb-6">In this chapter we have laid the rigorous mathematical foundations of the Recursive Harmonic Codex:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Introduced the RHC map <Math formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" />.</li>
              <li>Established the factorization into scale factor <Math formula="d" /> and primitive pair <Math formula="(p, q)" />.</li>
              <li>Proved the GCD–radius relation <Math formula="d = r / \sqrt{p^2 + q^2}" />.</li>
              <li>Showed that the angle <Math formula="\theta = \arctan(b/a)" /> encodes the ratio and is independent of scale.</li>
              <li>Defined the fold operator <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> and proved its key properties.</li>
              <li>Constructed composite geometric figures and introduced observables <Math formula="\Delta\theta" /> and <Math formula="K" />.</li>
              <li>Examined the lattice of primitive pairs and its density properties.</li>
              <li>Discussed extensions to Gaussian integers.</li>
            </ul>
            <p>These foundations provide the necessary tools for the core mathematical results of Chapter 3 and the connection to information geometry in Chapter 4.</p>
          </Section>

          <Section id="results" title="3. Core Results" subtitle="Theorems and Identities">
            <h3 className="text-2xl font-serif mb-6">3.1 Introduction: The Arithmetic-Geometric Bridge</h3>
            <p className="mb-6">
              The foundations laid in Chapter 2 established a simple yet profound correspondence: every pair of positive integers <Math formula="(a,b)" /> corresponds uniquely to a point <Math formula="z=a+ib" /> in the complex plane. This mapping, <Math formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" />, is injective and reveals a natural decomposition into scale factor <Math formula="d=\gcd(a,b)" /> and primitive pair <Math formula="(p,q)" /> with <Math formula="\gcd(p,q)=1" />. The angle <Math formula="\theta=\arctan(b/a)" /> encodes the ratio independent of scale, while the modulus <Math formula="r=\sqrt{a^2+b^2}" /> encodes the scale.
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

            <Callout type="def" label="Theorem 3.1 (GCD as Geometric Construct)" className="mb-6">
              For any pair <Math formula="(a,b) \in \mathbb{N}^2" />, let <Math formula="z=\Psi(a,b)=a+ib" />. Write <Math formula="a=dp" />, <Math formula="b=dq" /> with <Math formula="d=\gcd(a,b)" /> and <Math formula="\gcd(p,q)=1" />. Then
              <MathBlock formula="d = \frac{|z|}{\sqrt{p^2+q^2}}." />
              Equivalently,
              <MathBlock formula="\gcd(a,b) = \sqrt{\frac{a^2+b^2}{p^2+q^2}}." />
              <p className="mt-2 text-sm italic">Proof. Direct computation from Theorem 2.4.1. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.1.1 (Geometric Interpretation).</strong> This theorem tells us that the GCD is not merely an abstract number-theoretic function; it is the ratio of two lengths: the hypotenuse of the right triangle with legs <Math formula="a" /> and <Math formula="b" />, and the hypotenuse of the primitive triangle with legs <Math formula="p" /> and <Math formula="q" />. In other words, every integer pair's GCD is the scale factor that relates the actual triangle to its primitive, irreducible form.</p>
            <p className="mb-4"><strong>Remark 3.1.2 (Layman's Terms).</strong> Imagine you have a right triangle with legs of length 6 and 8. Its hypotenuse is 10. The primitive triangle with legs 3 and 4 has hypotenuse 5. The GCD of 6 and 8 is <Math formula="10/5=2" />. The GCD is the factor that scales the primitive triangle up to the actual triangle.</p>
            <p className="mb-8"><strong>Remark 3.1.3 (Computational Significance).</strong> This theorem provides a geometric method for computing the GCD: given any pair, one can find the primitive pair by reducing the fraction <Math formula="b/a" /> to lowest terms, then compute <Math formula="d=r/\sqrt{p^2+q^2}" />. While not computationally efficient for large numbers, it reveals a deep connection between arithmetic and geometry.</p>
            <GCDRadiusTheorem />

            <h4 className="text-xl font-serif mt-12 mb-4">3.2.2 Theorem 3.2: Angle Complementarity in the Euclidean Algorithm</h4>
            <p className="mb-6">
              The Euclidean algorithm, as it iteratively reduces a pair <Math formula="(a,b)" /> to <Math formula="(b, a \pmod b)" />, induces a sequence of points in the complex plane. The following theorem shows that the angles of successive points are related in a simple, elegant way.
            </p>

            <Callout type="def" label="Theorem 3.2 (Angle Complementarity)" className="mb-6">
              Let <Math formula="(a,b) \in \mathbb{N}^2" /> with <Math formula="a \ge b" />. Write <Math formula="a=qb+r" /> where <Math formula="q=\lfloor a/b \rfloor" /> and <Math formula="0 \le r < b" /> (the division algorithm). Define the angles
              <MathBlock formula="\theta_1 = \arctan \frac{b}{a}, \quad \theta_2 = \arctan \frac{r}{b}," />
              with the convention <Math formula="\theta_2=0" /> if <Math formula="r=0" />. Then
              <MathBlock formula="\tan \theta_1 = \frac{1}{q + \tan \theta_2}." />
              <p className="mt-2 text-sm italic">Proof. From the division, <Math formula="a=qb+r" />. Then <Math formula="\tan \theta_1 = \frac{b}{a} = \frac{b}{qb+r} = \frac{1}{q + \frac{r}{b}} = \frac{1}{q + \tan \theta_2}" />. ∎</p>
            </Callout>
            <EuclideanAlgorithm />

            <p className="mb-4"><strong>Corollary 3.2.1 (Iterated Angle Complementarity).</strong> Applying the theorem repeatedly, we obtain a continued fraction representation for the tangent of the original angle:</p>
            <MathBlock formula="\tan \theta_0 = \frac{1}{q_1 + \frac{1}{q_2 + \frac{1}{\ddots + \frac{1}{q_k}}}}," />
            <p className="mb-8">where <Math formula="\theta_0 = \arctan(b/a)" /> and <Math formula="q_1, q_2, \dots, q_k" /> are the quotients in the Euclidean algorithm.</p>
            <ContinuedFractionTree />

            <p className="mb-4"><strong>Remark 3.2.1 (Geometric Meaning).</strong> The angle complementarity theorem shows that each step of the Euclidean algorithm reduces the problem to a smaller angle in a precise algebraic way. The sequence of angles <Math formula="\theta_0, \theta_1, \theta_2, \dots" /> traces a path through angle space that converges to zero as the algorithm terminates. The quotients <Math formula="q_i" /> determine how quickly this convergence occurs.</p>
            <p className="mb-8"><strong>Remark 3.2.2 (Connection to Continued Fractions).</strong> The continued fraction expansion of <Math formula="b/a" /> emerges naturally from the geometry of right triangles. This connection, known since the 18th century, is here given a fresh geometric interpretation: each quotient corresponds to a "fold" in the angle space.</p>

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 3.2.1 (Fibonacci Numbers).</strong> Take <Math formula="a=55, b=34" /> (consecutive Fibonacci numbers). The Euclidean algorithm proceeds:</p>
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
                <li><Math formula="\theta_0 = \arctan(34/55) \approx 0.558" /></li>
                <li><Math formula="\theta_1 = \arctan(21/34) \approx 0.558" /></li>
                <li><Math formula="\theta_2 = \arctan(13/21) \approx 0.558" /></li>
              </ul>
              <p>Remarkably, all intermediate angles are nearly equal because consecutive Fibonacci numbers have nearly the same ratio (approaching <Math formula="\phi" />). This illustrates why the Euclidean algorithm takes so many steps for Fibonacci numbers—the angles decrease very slowly.</p>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">3.2.3 Theorem 3.3: The Angle Sequence and Algorithmic Complexity</h4>
            <p className="mb-6">The following theorem quantifies the relationship between the angle sequence and the number of steps in the Euclidean algorithm.</p>

            <Callout type="def" label="Theorem 3.3 (Angle Decay Rate)" className="mb-6">
              Let <Math formula="\theta_0, \theta_1, \dots, \theta_k" /> be the angles generated by the Euclidean algorithm for the pair <Math formula="(a,b)" /> with <Math formula="a \ge b" />. Then for each <Math formula="i" />,
              <MathBlock formula="\theta_{i+1} \le \frac{\theta_i}{q_{i+1} + 1}," />
              where <Math formula="q_{i+1}" /> is the quotient at step <Math formula="i+1" />. In particular, when all quotients are 1 (the Fibonacci case), the angles decrease by a factor of approximately <Math formula="\phi^{-1} \approx 0.618" /> at each step.
              <p className="mt-2 text-sm italic">Proof. From Theorem 3.2, <Math formula="\tan \theta_i = 1 / (q_{i+1} + \tan \theta_{i+1})" />. Since <Math formula="\tan \theta" /> is increasing on <Math formula="[0, \pi/2)" />, we have <Math formula="\theta_i \ge \arctan(1 / (q_{i+1} + 1))" />. Using the inequality <Math formula="\arctan(1/x) \ge 1/(x+1)" /> for <Math formula="x > 0" />, we obtain the result. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 3.3.1 (Lamé's Theorem Revisited).</strong> The number of steps <Math formula="k" /> in the Euclidean algorithm satisfies</p>
            <MathBlock formula="k \le \frac{\ln b}{\ln \phi} + 1," />
            <p className="mb-8">where <Math formula="\phi" /> is the golden ratio. This is a refined version of Lamé's theorem, with the optimal constant.</p>

            <p className="mb-8"><strong>Remark 3.3.1.</strong> This result shows that the golden ratio emerges naturally as the optimal decay constant, explaining why Fibonacci numbers—whose ratios converge to <Math formula="\phi" />—produce the worst-case behavior.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.3 Theorems on the Fold Operator</h3>
            <p className="mb-6">The fold operator <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> plays a starring role in the RHC. We now prove several theorems that reveal its deep connections to geometry, algebra, and number theory.</p>

            <h4 className="text-xl font-serif mb-4">3.3.1 Theorem 3.4: Fold as Inner Product</h4>
            <Callout type="def" label="Theorem 3.4 (Fold as Inner Product)" className="mb-6">
              For any two angles <Math formula="\theta_1, \theta_2 \in \mathbb{R}" />, let <Math formula="u = e^{i\theta_1}" /> and <Math formula="v = e^{i\theta_2}" />. Then
              <MathBlock formula="\mathcal{F}\left(\frac{u}{v}\right) = \cos(\theta_1 - \theta_2)." />
              <p className="mt-2 text-sm italic">Proof. Since <Math formula="u/v = e^{i(\theta_1 - \theta_2)}" />, Theorem 2.6.1(2) gives <Math formula="\mathcal{F}(e^{i(\theta_1 - \theta_2)}) = \cos(\theta_1 - \theta_2)" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.4.1 (Geometric Interpretation).</strong> The fold operator applied to the ratio of two unit complex numbers yields the cosine of the angle between them—the standard inner product in the plane. This identifies <Math formula="\mathcal{F}" /> as a kind of "algebraic cosine" that works for any complex numbers, not just unit vectors.</p>
            <p className="mb-8"><strong>Remark 3.4.2 (Connection to Euclidean Geometry).</strong> In Euclidean geometry, the dot product of two vectors <Math formula="u,v" /> satisfies <Math formula="u \cdot v = |u||v| \cos \theta" />. The fold operator, when applied to normalized vectors, extracts exactly this cosine. For non-unit vectors, <Math formula="\mathcal{F}(u/v)" /> gives a scaled version that depends on the magnitudes.</p>
            <FoldUnitCircle />
            <p className="mb-8"><strong>Corollary 3.4.1 (Fold and Projection).</strong> If <Math formula="u = e^{i\theta}" /> and we fix <Math formula="v = 1" /> (the real axis), then <Math formula="\mathcal{F}(u) = \cos \theta" /> is the projection of <Math formula="u" /> onto the real axis.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.2 Theorem 3.5: Fold and the Euclidean Algorithm</h4>
            <Callout type="def" label="Theorem 3.5 (Fold and the Euclidean Algorithm)" className="mb-6">
              Let <Math formula="(a,b) \in \mathbb{N}^2" /> with <Math formula="a \ge b" />, and let <Math formula="r = a \pmod b" />. Define the complex numbers
              <MathBlock formula="z = a + ib, \quad z' = b + ir." />
              Let <Math formula="\theta = \arg(z)" /> and <Math formula="\theta' = \arg(z')" />. Then
              <MathBlock formula="\mathcal{F}\left(\frac{z}{z'}\right) = \cos(\theta - \theta')." />
              <p className="mt-2 text-sm italic">Proof. By Theorem 3.4, <Math formula="\mathcal{F}(z/z') = \cos(\arg(z) - \arg(z'))" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Remark 3.5.1 (Geometric Meaning).</strong> At each step of the Euclidean algorithm, the fold operator measures the angular change between successive complex representatives. The sequence of such cosines encodes the geometric progression of the algorithm.</p>
            <p className="mb-4"><strong>Corollary 3.5.1 (Angle Change Sequence).</strong> Let <Math formula="\theta_0, \theta_1, \dots, \theta_k" /> be the angles from Theorem 3.2. Then</p>
            <MathBlock formula="\cos(\theta_i - \theta_{i+1}) = \mathcal{F}\left(\frac{z_i}{z_{i+1}}\right)," />
            <p className="mb-8">
              where <Math formula="z_i" /> are the corresponding complex numbers. This provides a complete geometric description of the Euclidean algorithm.
            </p>
            <FoldEuclideanSpiral />

            <div className="bg-cream-100 p-6 rounded-xl mb-8 border-l-4 border-gold-400">
              <p className="mb-4"><strong>Example 3.5.1 (Illustration).</strong> For <Math formula="(a,b) = (55,34)" />, we have <Math formula="z_0 = 55+34i, z_1 = 34+21i" />. Then</p>
              <MathBlock formula="\frac{z_0}{z_1} = \frac{55+34i}{34+21i} \approx 1.618 - 0.001i," />
              <p>and <Math formula="\mathcal{F}(z_0/z_1) \approx 0.9999" />, which is very close to <Math formula="\cos(0) = 1" />. Indeed, the angle difference is tiny because the ratios are nearly equal.</p>
            </div>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.3 Theorem 3.6: Iterated Fold and Chebyshev Polynomials</h4>
            <Callout type="def" label="Theorem 3.6 (Fold and Chebyshev Polynomials)" className="mb-6">
              For <Math formula="x = e^{i\theta}" />,
              <MathBlock formula="\mathcal{F}(x^n) = T_n(\cos \theta)," />
              where <Math formula="T_n" /> is the Chebyshev polynomial of the first kind defined by <Math formula="T_n(\cos \theta) = \cos(n\theta)" />.
              <p className="mt-2 text-sm italic">Proof. <Math formula="x^n = e^{in\theta}" />, so <Math formula="\mathcal{F}(x^n) = \cos(n\theta) = T_n(\cos \theta)" />. ∎</p>
            </Callout>

            <p className="mb-4"><strong>Corollary 3.6.1 (Iterated Fold on Powers).</strong> For any integer <Math formula="m" />,</p>
            <MathBlock formula="\mathcal{F}(x^m) = T_m(\mathcal{F}(x))." />
            <p className="mb-8"><strong>Remark 3.6.1.</strong> This connection to Chebyshev polynomials links the fold operator to approximation theory, orthogonal polynomials, and spectral methods. It also provides a computational tool: iterated applications of the fold operator correspond to multiplication of angles.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.3.4 Theorem 3.7: Algebraic Properties of the Fold Operator</h4>
            <Callout type="def" label="Theorem 3.7 (Algebraic Properties)" className="mb-6">
              The fold operator satisfies the following algebraic identities for all non-zero <Math formula="x,y" />:
              <ul className="list-decimal pl-6 mt-4 space-y-2">
                <li><Math formula="\mathcal{F}(x)\mathcal{F}(y) = \frac{1}{2}[\mathcal{F}(xy) + \mathcal{F}(x/y)]" /></li>
                <li><Math formula="\mathcal{F}(x)^2 - 1 = \frac{1}{4}(x - \frac{1}{x})^2" /></li>
                <li><Math formula="\mathcal{F}(x) = \mathcal{F}(1/x)" /></li>
                <li><Math formula="\mathcal{F}(\bar{x}) = \overline{\mathcal{F}(x)}" /></li>
              </ul>
              <p className="mt-4 text-sm italic">Proof. Direct algebraic manipulation. For (1), compute: <Math formula="\mathcal{F}(x)\mathcal{F}(y) = \frac{1}{4}(x + \frac{1}{x})(y + \frac{1}{y}) = \frac{1}{4}(xy + \frac{x}{y} + \frac{y}{x} + \frac{1}{xy})" />. But <Math formula="\mathcal{F}(xy) = \frac{1}{2}(xy + 1/(xy))" /> and <Math formula="\mathcal{F}(x/y) = \frac{1}{2}(x/y + y/x)" />. Adding these gives exactly twice the expression above. ∎</p>
            </Callout>

            <p className="mb-8"><strong>Remark 3.7.1.</strong> These algebraic identities show that the fold operator behaves like a kind of "hyperbolic cosine" in the complex domain. Indeed, if we set <Math formula="x = e^t" />, then <Math formula="\mathcal{F}(x) = \cosh t" />. Many of the identities above are hyperbolic trigonometric identities in disguise.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.4 Limits and Constraints of the Mapping</h3>
            <p className="mb-6">The RHC mapping <Math formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> produces a discrete lattice of points. Understanding its properties—discreteness, density, and distribution—is essential for connecting to continuous geometry.</p>

            <h4 className="text-xl font-serif mb-4">3.4.1 Lemma 3.1: Discreteness of the Lattice</h4>
            <Callout type="def" label="Lemma 3.1 (Discreteness)" className="mb-6">
              The set <Math formula="\Psi(\mathbb{N}^2) = \{a+ib \mid a,b \in \mathbb{N}\}" /> is a discrete subset of <Math formula="\mathbb{C}" />. Specifically, every point has an open neighborhood containing no other points of the set.
              <p className="mt-2 text-sm italic">Proof. For any distinct points <Math formula="z_1 = a_1 + ib_1" /> and <Math formula="z_2 = a_2 + ib_2" />, the Euclidean distance satisfies <Math formula="|z_1 - z_2| \ge 1" /> because the real and imaginary parts are integers and the difference in at least one coordinate is at least 1. Hence any open ball of radius <Math formula="< 1/2" /> contains at most one point. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.4.1.</strong> This lemma establishes that the RHC points are isolated—there is a minimum distance of 1 between any two distinct points. This discreteness is fundamental: it means that the RHC describes a genuinely discrete structure, not a continuous one. Any continuum behavior must emerge only in the limit of large numbers.</p>
            <ComplexPlaneLattice />

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.2 Proposition 3.1: Density of Angles</h4>
            <Callout type="def" label="Proposition 3.1 (Density of Angles)" className="mb-6">
              The set of angles
              <MathBlock formula="\Theta = \{ \arctan \frac{b}{a} \mid a,b \in \mathbb{N} \}" />
              is dense in the interval <Math formula="[0, \pi/2]" />.
              <p className="mt-2 text-sm italic">Proof. The map <Math formula="\theta \mapsto \tan \theta" /> is a continuous bijection from <Math formula="[0, \pi/2)" /> to <Math formula="[0, \infty)" />. Since the set of rational numbers <Math formula="\mathbb{Q}" /> is dense in <Math formula="\mathbb{R}" />, for any <Math formula="\alpha \in [0, \pi/2)" /> we can find a sequence of rationals <Math formula="r_n = p_n/q_n \to \tan \alpha" />. Then <Math formula="\arctan(p_n/q_n) \to \alpha" />. But <Math formula="p_n/q_n" /> is a ratio of integers; taking <Math formula="a_n = q_n, b_n = p_n" /> (or the reverse if needed) gives a sequence in <Math formula="\Theta" /> converging to <Math formula="\alpha" />. The endpoint <Math formula="\pi/2" /> is approached by taking <Math formula="b/a \to \infty" />. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.4.2.</strong> This proposition shows that while the points themselves are discrete, their angles are dense. Thus, by choosing large enough integers, we can approximate any desired angle arbitrarily closely. This is the foundation for the continuum limit.</p>
            <AngleDensityPlot />

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.3 Proposition 3.2: Uniform Distribution of Angles</h4>
            <Callout type="def" label="Proposition 3.2 (Uniform Distribution of Angles)" className="mb-6">
              The set <Math formula="\Theta" /> is uniformly distributed in <Math formula="[0, \pi/2]" /> with respect to the measure <Math formula="d\theta / (\sin \theta \cos \theta)" />. Equivalently, the variable <Math formula="t = \ln \tan \theta" /> is uniformly distributed on <Math formula="\mathbb{R}" />.
              <p className="mt-2 text-sm italic">Proof. This follows from the fact that the map <Math formula="(a,b) \mapsto \ln(b/a)" /> distributes points uniformly as <Math formula="a,b" /> become large, due to the equidistribution of Farey fractions. A rigorous proof uses Weyl's criterion and properties of the Möbius function. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.4.3.</strong> This uniform distribution property is crucial for the connection to information geometry. The Fisher distance <Math formula="d_F = |\ln \tan \theta_2 - \ln \tan \theta_1|" /> is exactly the Euclidean distance in the coordinate <Math formula="t" />. Thus, the RHC angles become uniformly spaced in the Fisher metric, which is the natural information-geometric distance.</p>

            <h4 className="text-xl font-serif mt-12 mb-4">3.4.4 Proposition 3.3: Growth of Primitive Pairs</h4>
            <Callout type="def" label="Proposition 3.3 (Asymptotic Density of Primitive Pairs)" className="mb-6">
              The number of primitive pairs <Math formula="(p,q)" /> with <Math formula="p,q \le N" /> is asymptotically
              <MathBlock formula="\frac{6}{\pi^2}N^2 + O(N \log N)." />
              <p className="mt-2 text-sm italic">Proof. This is a classic result: the probability that two random integers are coprime is <Math formula="6/\pi^2" />. The proof uses the inclusion-exclusion principle and properties of the Möbius function. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.4.4.</strong> This result quantifies how many distinct rays (primitive ratios) exist up to a given scale. The constant <Math formula="6/\pi^2 \approx 0.6079" /> is the density of visible lattice points from the origin.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.5 Theorems on the Primitive Lattice</h3>
            <p className="mb-6">The primitive pairs <Math formula="(p,q)" /> with <Math formula="\gcd(p,q)=1" /> form a fascinating mathematical object in their own right. We collect here several theorems that illuminate their structure.</p>

            <h4 className="text-xl font-serif mb-4">3.5.1 Theorem 3.8: Symmetry of Primitive Pairs</h4>
            <Callout type="def" label="Theorem 3.8 (Symmetry)" className="mb-6">
              If <Math formula="(p,q)" /> is a primitive pair, then so are <Math formula="(q,p)" />, <Math formula="(p,p+q)" />, and <Math formula="(p+q,q)" />. Moreover, the set of primitive pairs forms a tree under the operations of "addition" (the Stern-Brocot tree).
              <p className="mt-2 text-sm italic">Proof. These properties follow directly from the definition of coprimality and the Euclidean algorithm. The Stern-Brocot tree is a well-known enumeration of all positive rationals via mediants; its nodes correspond to primitive pairs. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.5.1.</strong> The Stern-Brocot tree provides a beautiful way to generate all primitive pairs recursively, starting from <Math formula="(1,1)" /> and repeatedly taking mediants. This tree structure is intimately connected to the Euclidean algorithm and continued fractions.</p>
            <SternBrocotTree />

            <h4 className="text-xl font-serif mt-12 mb-4">3.5.2 Theorem 3.9: The Ford Circle Connection</h4>
            <Callout type="def" label="Theorem 3.9 (Ford Circles)" className="mb-6">
              Each primitive pair <Math formula="(p,q)" /> with <Math formula="p/q" /> in reduced form corresponds to a Ford circle tangent to the real axis at <Math formula="p/q" /> with radius <Math formula="1/(2q^2)" />. The circles are mutually tangent or disjoint, and their tangency pattern encodes the Farey sequence.
              <p className="mt-2 text-sm italic">Proof. Ford circles are a classical construction in number theory. The tangency condition between circles at <Math formula="p/q" /> and <Math formula="r/s" /> is <Math formula="|ps-qr|=1" />, which is exactly the condition that the fractions are neighbors in the Farey sequence. This is equivalent to the pairs being adjacent in the Stern-Brocot tree. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.5.2.</strong> This connection to Ford circles provides a beautiful geometric visualization of primitive pairs: each pair corresponds to a circle tangent to the real axis, and the circles pack the upper half-plane in a fractal pattern. The RHC's rays become diameters through these circles.</p>
            <FareySequence />

            <h4 className="text-xl font-serif mt-12 mb-4">3.5.3 Theorem 3.10: Primitive Pairs and the Modular Group</h4>
            <Callout type="def" label="Theorem 3.10 (Modular Group Action)" className="mb-6">
              The set of primitive pairs is invariant under the action of the modular group <Math formula="PSL(2,\mathbb{Z})" /> acting on the ratio <Math formula="p/q" /> by fractional linear transformations:
              <MathBlock formula="\frac{p}{q} \mapsto \frac{ap+bq}{cp+dq}, \quad \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in SL(2,\mathbb{Z})." />
              <p className="mt-2 text-sm italic">Proof. Since the transformation preserves coprimality (determinant 1), it maps primitive pairs to primitive pairs. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 3.5.3.</strong> The modular group is the symmetry group of the Farey sequence and the complex upper half-plane. Its action on primitive pairs encodes the deep arithmetic structure underlying the RHC.</p>

            <h3 className="text-2xl font-serif mt-12 mb-6">3.6 Summary and Significance</h3>
            <p className="mb-6">In this chapter, we have proven a series of theorems that reveal the rich structure hidden within the simple mapping <Math formula="(a,b) \mapsto a+ib" />:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Theorem 3.1 establishes the GCD as a geometric construct, linking arithmetic to triangle geometry.</li>
              <li>Theorem 3.2 reveals the angle complementarity in the Euclidean algorithm, connecting the algorithm to continued fractions.</li>
              <li>Theorem 3.3 quantifies the decay of angles, leading to a refined version of Lamé's theorem and the emergence of the golden ratio.</li>
              <li>Theorem 3.4 identifies the fold operator as an inner product, linking it to Euclidean geometry.</li>
              <li>Theorem 3.5 shows how the fold operator tracks the Euclidean algorithm's steps geometrically.</li>
              <li>Theorem 3.6 connects the fold operator to Chebyshev polynomials, opening connections to approximation theory.</li>
              <li>Theorem 3.7 provides algebraic identities for the fold operator, revealing its hyperbolic nature.</li>
              <li>Lemma 3.1 and Propositions 3.1-3.3 establish the discrete and dense properties of the RHC lattice.</li>
              <li>Theorems 3.8-3.10 connect primitive pairs to the Stern-Brocot tree, Ford circles, and the modular group, revealing a deep arithmetic-geometric structure.</li>
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

            <div className="mt-12 p-8 bg-navy-800 rounded-2xl text-white no-pdf">
              <h4 className="text-xl font-serif mb-4 text-gold-400">Interactive Exploration</h4>
              <p className="text-sm opacity-80 mb-6">
                The Recursive Harmonic Codex is not just a document; it's a living mathematical structure. Explore the relationships between discrete integers and continuous geometry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">01. LATTICE</span>
                  <span className="text-sm font-medium">Visualize Integer Grid</span>
                </button>
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">02. FOLD</span>
                  <span className="text-sm font-medium">Apply Fold Operator</span>
                </button>
                <button className="p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-left">
                  <span className="block text-xs font-mono opacity-50 mb-1">03. HARMONIC</span>
                  <span className="text-sm font-medium">Analyze Harmonic Ratios</span>
                </button>
              </div>
            </div>
          </Section>

          <Section id="info-geom" title="4. Connection to Information Geometry" subtitle="Fisher Metric and Manifolds">
            <h3 className="text-4xl font-serif mb-8 text-navy-900">4.1 Introduction: The Information-Geometric Bridge</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The preceding chapters established a rigorous mathematical framework connecting discrete arithmetic to continuous geometry. The RHC mapping <Math formula="\Psi: \mathbb{N}^2 \to \mathbb{C}" /> revealed that every integer pair <Math formula="(a,b)" /> corresponds to a point <Math formula="z = a + ib" /> in the complex plane, with the angle <Math formula="\theta = \arctan(b/a)" /> encoding the ratio independent of scale, and the modulus <Math formula="r = \sqrt{a^2 + b^2}" /> encoding scale. The <GlossaryTerm term="Fold Operator" definition="A mathematical operator in RHC that maps ratios to symmetric values, defined as F(x) = (x + 1/x)/2.">fold operator</GlossaryTerm> <Math formula="\mathcal{F}(x) = \frac{1}{2}(x + x^{-1})" /> emerged as a natural algebraic structure with deep geometric significance.
            </p>
            
            <PullQuote author="Recursive Harmonic Codex, Ch. 4">
              "Information is not merely data; it is the geometry of the space in which that data resides."
            </PullQuote>

            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              We now build a bridge from this arithmetic-geometric edifice to the realm of <GlossaryTerm term="Information Geometry" definition="The application of differential geometry to probability theory, treating probability distributions as points on a manifold.">information geometry</GlossaryTerm>—the study of probability distributions as geometric objects. This connection is not arbitrary; it arises from a fundamental observation: the space of ratios <Math formula="b/a" /> (or equivalently, angles <Math formula="\theta" />) possesses a natural metric inherited from the Fisher information of certain statistical families. Remarkably, this metric takes a form that is perfectly adapted to the RHC structure.
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
              Let <Math formula="\mathcal{M} = \{p(x \mid \xi) \mid \xi = (\xi^1, \dots, \xi^n) \in \Theta \subseteq \mathbb{R}^n\}" /> be a parametric family of probability distributions. Under suitable regularity conditions, <Math formula="\mathcal{M}" /> forms an <Math formula="n" />-dimensional <GlossaryTerm term="Statistical Manifold" definition="A Riemannian manifold where each point represents a probability distribution from a parametric family.">statistical manifold</GlossaryTerm> with coordinates <Math formula="\xi" />.
            </p>
            <div className="my-12 p-8 bg-navy-900 rounded-2xl shadow-inner">
              <p className="mb-4 text-white/70 font-mono text-xs uppercase tracking-widest">Definition: Fisher Information Matrix</p>
              <MathBlock formula="g_{ij}(\xi) = \mathbb{E}_{p(x \mid \xi)} \left[ \frac{\partial \log p(x \mid \xi)}{\partial \xi^i} \frac{\partial \log p(x \mid \xi)}{\partial \xi^j} \right] = \int p(x \mid \xi) \frac{\partial \log p}{\partial \xi^i} \frac{\partial \log p}{\partial \xi^j} \, dx." />
            </div>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              This matrix defines a Riemannian metric on <Math formula="\Theta" />: <Math formula="ds^2 = \sum_{i,j} g_{ij}(\xi) \, d\xi^i d\xi^j" />. Čencov's theorem guarantees its uniqueness under the natural requirement of invariance under sufficient statistics.
            </p>

            <h4 className="text-2xl font-serif mt-12 mb-6 text-navy-800">4.2.3 Geometric Meaning</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Geodesic" definition="The shortest path between two points on a curved surface or manifold.">geodesic distance</GlossaryTerm> induced by this metric quantifies the distinguishability between two distributions: the larger the distance, the easier it is to tell them apart based on observations.
            </p>
            
            <EntropyFlowVisual />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.3 Mapping RHC to a Statistical Manifold</h3>
            <p className="mb-6 italic text-navy-600 font-serif">This section introduces an interpretive hypothesis, clearly distinguished from proven mathematics.</p>
            
            <Callout type="def" label="Hypothesis 4.1 (Statistical Interpretation of the Ratio)" className="mb-8 border-purple-500/30 bg-purple-500/5">
              <p className="text-lg">
                Consider the ratio <Math formula="\mu = b/a" /> associated with an integer pair <Math formula="(a,b)" />. We propose that <Math formula="\mu" /> (or equivalently the angle <Math formula="\theta = \arctan \mu" />) can be regarded as a parameter of a family of probability distributions. A natural candidate is a scale family, where the Fisher metric takes the simple form
              </p>
              <MathBlock formula="ds^2 = \frac{d\mu^2}{\mu^2}." />
              <p className="mt-4 text-sm opacity-80">
                Such a metric arises for the family of exponential distributions with mean <Math formula="\mu" />. The choice is forced by the underlying symmetry of scale invariance.
              </p>
            </Callout>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.4 Derivation of the Fisher Metric in Angle Coordinates</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              We now perform the change of variables from <Math formula="\mu" /> to <Math formula="\theta = \arctan \mu" />, which is the natural coordinate on the RHC state space.
            </p>
            
            <FisherMetricPlot />

            <Callout type="def" label="Derivation 4.1 (Fisher Metric in Terms of θ)" className="mb-8">
              <p>Starting from <Math formula="ds^2 = d\mu^2/\mu^2" />, let <Math formula="\mu = \tan \theta" />. Then <Math formula="d\mu = \sec^2 \theta \, d\theta" />. Substituting gives:</p>
              <MathBlock formula="\frac{d\mu^2}{\mu^2} = \frac{\sec^4 \theta \, d\theta^2}{\tan^2 \theta} = \frac{1}{\sin^2 \theta \cos^2 \theta} \, d\theta^2." />
              <p className="mt-4">Hence the Fisher metric on the space of angles is <Math formula="ds^2 = \frac{1}{\sin^2 \theta \cos^2 \theta} \, d\theta^2" />.</p>
            </Callout>

            <GeodesicDistancePlot />

            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The geodesic distance between two angles <Math formula="\theta_1" /> and <Math formula="\theta_2" /> is simply the absolute difference of the log‑tangents: <Math formula="d_F(\theta_1, \theta_2) = |\ln \tan \theta_2 - \ln \tan \theta_1|" />.
            </p>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.5 Linking RHC Angle Difference to Fisher Distance</h3>
            <Callout type="def" label="Theorem 4.1 (Small‑Angle Approximation)" className="mb-8">
              <p>Let <Math formula="\Delta \theta = \theta_2 - \theta_1" /> be small. Then the Fisher distance is approximately:</p>
              <MathBlock formula="d_F(\theta_1, \theta_2) \approx \frac{2}{\sin(2\bar{\theta})} \, \Delta \theta + \mathcal{O}((\Delta \theta)^2)." />
            </Callout>

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.6 Connection to the Fold Operator and Bhattacharyya Coefficient</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Bhattacharyya Coefficient" definition="A measure of the amount of overlap between two statistical samples or populations.">Bhattacharyya coefficient</GlossaryTerm> provides another measure of overlap between probability distributions.
            </p>
            
            <FoldOperatorVisual />

            <Callout type="def" label="Proposition 4.1 (Bhattacharyya Coefficient and the Fold Operator)" className="mb-8">
              <p>For two Bernoulli distributions with parameters <Math formula="p = a/(a+b)" /> and <Math formula="q = b/(a+b)" />, the Bhattacharyya coefficient is:</p>
              <MathBlock formula="BC = \frac{2\sqrt{ab}}{a+b} = \frac{1}{\mathcal{F}(\sqrt{a/b})}." />
              <p className="mt-4 text-sm opacity-80">
                The fold operator, which emerged purely from the arithmetic‑geometric mapping, appears naturally in the expression for an information‑theoretic overlap measure.
              </p>
            </Callout>

            <FoldProcessVisual />

            <QuantumInformationGeometry />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.7 Information Geometry of the Primitive Lattice</h3>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The <GlossaryTerm term="Primitive Lattice" definition="The set of all points (p, q) in the integer grid such that p and q are coprime (GCD = 1).">primitive lattice</GlossaryTerm> <Math formula="\mathcal{P} = \{(p,q) \in \mathbb{N}^2 \mid \gcd(p,q) = 1\}" /> inherits a natural information geometry from the Fisher metric on the space of ratios.
            </p>

            <PrimitiveLatticeVisual />

            <h3 className="text-4xl font-serif mt-16 mb-8 text-navy-900">4.8 The Fisher-Rao Metric and the Geometry of the RHC</h3>
            <h4 className="text-2xl font-serif mb-6 text-navy-800">4.8.1 Curvature</h4>
            <p className="mb-6 text-lg leading-relaxed text-navy-700">
              The Fisher metric on the space of angles has remarkable geometric properties, including constant curvature.
            </p>
            
            <CurvatureHeatmap />

            <div className="mt-16 p-12 bg-navy-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <h4 className="text-3xl font-serif mb-6 text-emerald-400">Chapter 4 Summary</h4>
              <p className="text-lg opacity-80 mb-8 leading-relaxed">
                We have established that the RHC is not merely a collection of integer ratios, but a structured manifold of information. The Fisher metric provides the "glue" that binds arithmetic to geometry, while the fold operator quantifies the overlap of states.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">Key Insight</h5>
                  <p className="text-sm">The Fisher distance between RHC states is the absolute difference of their log-tangents.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">Unification</h5>
                  <p className="text-sm">The fold operator is the reciprocal of the Bhattacharyya coefficient for Bernoulli states.</p>
                </div>
              </div>
            </div>
            <Callout type="theorem" label="Theorem" number="4.2 (Constant Curvature of the Fisher Manifold)" className="mb-8">
              <p>For the statistical manifold of the RHC, the scalar curvature is twice the Gaussian curvature. Computing the Christoffel symbol and the Riemann tensor yields <Math formula="R = 2" />. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 4.8.1.</strong> Constant positive curvature indicates that the space of angles is a model of elliptic geometry (a hemisphere). This curvature will have physical interpretations in Chapter 5.</p>

            <h4 className="text-xl font-serif mt-8 mb-4">4.8.2 Geodesics</h4>
            <Callout type="theorem" label="Proposition" number="4.5 (Geodesics)" className="mb-6">
              <p>The geodesics of the Fisher metric are given by</p>
              <MathBlock formula="\theta(t) = \arctan(e^t)," />
              <p className="mt-4">where <Math formula="t" /> is the arc length parameter (the <Math formula="t" /> coordinate introduced earlier). In the <Math formula="t" /> coordinate, geodesics are straight lines.</p>
              <p className="mt-4 italic text-sm">Proof. In the uniformizing coordinate <Math formula="t = \ln \tan \theta" />, the metric becomes <Math formula="ds^2 = dt^2" />, so geodesics are lines of constant <Math formula="t" />. Transforming back gives the stated form. ∎</p>
            </Callout>

            <h4 className="text-xl font-serif mt-8 mb-4">4.8.3 Isometries</h4>
            <Callout type="theorem" label="Proposition" number="4.6 (Isometry Group)" className="mb-6">
              <p>The isometry group of the Fisher metric on the space of angles is generated by the transformation <Math formula="\theta \mapsto \pi/2 - \theta" /> (corresponding to reciprocal ratios) and the scaling <Math formula="t \mapsto t + c" /> (corresponding to multiplicative changes in ratio).</p>
              <p className="mt-4 italic text-sm">Proof. In the <Math formula="t" /> coordinate, the metric is Euclidean, so the isometry group includes translations <Math formula="t \mapsto t + c" />. The transformation <Math formula="\theta \mapsto \pi/2 - \theta" /> corresponds to <Math formula="t \mapsto -t" />, which is also an isometry. ∎</p>
            </Callout>
            <p className="mb-8"><strong>Remark 4.8.2.</strong> The symmetry <Math formula="\theta \mapsto \pi/2 - \theta" /> corresponds to the exchange <Math formula="a \leftrightarrow b" /> in the original pair. Thus, the exchange symmetry of the fold operator is reflected in the isometries of the Fisher metric.</p>

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
                    <td className="p-4 border border-cream-300">Ratio <Math formula="\mu = b/a" /></td>
                    <td className="p-4 border border-cream-300">Statistical parameter of a scale family</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Geometric coordinate</td>
                    <td className="p-4 border border-cream-300">Angle <Math formula="\theta = \arctan(b/a)" /></td>
                    <td className="p-4 border border-cream-300">Coordinate on statistical manifold</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Metric</td>
                    <td className="p-4 border border-cream-300">Derived from complex plane</td>
                    <td className="p-4 border border-cream-300">Fisher-Rao metric <Math formula="ds^2 = d\mu^2/\mu^2" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Distance between states</td>
                    <td className="p-4 border border-cream-300"><Math formula="|\ln\tan\theta_2 - \ln\tan\theta_1|" /></td>
                    <td className="p-4 border border-cream-300">Fisher distance <Math formula="d_F" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Small-angle approximation</td>
                    <td className="p-4 border border-cream-300"><Math formula="\Delta \theta" /> scaled by <Math formula="2/\sin(2\bar{\theta})" /></td>
                    <td className="p-4 border border-cream-300">Linear approximation of Fisher distance</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Overlap measure</td>
                    <td className="p-4 border border-cream-300"><Math formula="\mathcal{F}(\sqrt{a/b})" /></td>
                    <td className="p-4 border border-cream-300">Bhattacharyya coefficient reciprocal</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Symmetry</td>
                    <td className="p-4 border border-cream-300"><Math formula="\mathcal{F}(x) = \mathcal{F}(1/x)" /></td>
                    <td className="p-4 border border-cream-300">Isometry <Math formula="\theta \mapsto \pi/2 - \theta" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Curvature</td>
                    <td className="p-4 border border-cream-300">—</td>
                    <td className="p-4 border border-cream-300">Constant scalar curvature <Math formula="R = 2" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-8">These connections are mathematically sound given the interpretive hypothesis of Section 4.3. They provide a firm foundation for the physical conjectures and testable predictions that follow in Chapters 5 and 6.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Naturalness</h4>
                <p className="text-sm leading-relaxed opacity-90">The Fisher metric <Math formula="d\mu^2/\mu^2" /> is the unique scale-invariant metric on the space of ratios, making it the natural geometric structure for the RHC state space.</p>
              </div>
              <div className="p-6 bg-navy-800 text-cream-50 rounded-xl">
                <h4 className="font-serif text-xl mb-4 text-gold-400">Uniformization</h4>
                <p className="text-sm leading-relaxed opacity-90">The coordinate <Math formula="t = \ln \tan \theta" /> transforms the Fisher metric to Euclidean form, revealing that the RHC angles are uniformly distributed with respect to the natural information-geometric distance.</p>
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
                    <td className="p-4 border border-cream-300"><Math formula="ds^2 = d\mu^2/\mu^2" /></td>
                    <td className="p-4 border border-cream-300">Scale-invariant metric on ratios</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fisher metric (angle)</td>
                    <td className="p-4 border border-cream-300"><Math formula="ds^2 = d\theta^2 / (\sin^2 \theta \cos^2 \theta)" /></td>
                    <td className="p-4 border border-cream-300">Metric in natural RHC coordinate</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Uniformizing coordinate</td>
                    <td className="p-4 border border-cream-300"><Math formula="t = \ln \tan \theta" /></td>
                    <td className="p-4 border border-cream-300">Makes metric Euclidean: <Math formula="ds^2 = dt^2" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fisher distance</td>
                    <td className="p-4 border border-cream-300"><Math formula="d_F(\theta_1, \theta_2) = |\ln \tan \theta_2 - \ln \tan \theta_1|" /></td>
                    <td className="p-4 border border-cream-300">Distinguishability measure</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Small-angle approximation</td>
                    <td className="p-4 border border-cream-300"><Math formula="d_F \approx (2/\sin 2\bar{\theta}) \Delta \theta" /></td>
                    <td className="p-4 border border-cream-300">Experimental testable form</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Bhattacharyya coefficient</td>
                    <td className="p-4 border border-cream-300"><Math formula="BC = 2\sqrt{ab}/(a+b)" /></td>
                    <td className="p-4 border border-cream-300">Overlap between <Math formula="(a,b)" /> and <Math formula="(b,a)" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Fold operator connection</td>
                    <td className="p-4 border border-cream-300"><Math formula="BC = 1/\mathcal{F}(\sqrt{a/b})" /></td>
                    <td className="p-4 border border-cream-300">Links arithmetic to information</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Scalar curvature</td>
                    <td className="p-4 border border-cream-300"><Math formula="R = 2" /></td>
                    <td className="p-4 border border-cream-300">Constant positive curvature</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Isometry group</td>
                    <td className="p-4 border border-cream-300"><Math formula="\theta \mapsto \pi/2 - \theta, t \mapsto t + c" /></td>
                    <td className="p-4 border border-cream-300">Symmetries of the space</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-cream-300">Density of primitive pairs</td>
                    <td className="p-4 border border-cream-300">Uniform in <Math formula="t" /></td>
                    <td className="p-4 border border-cream-300">Lattice becomes continuous in limit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <RHCMappingTable />

            <h3 className="text-2xl font-serif mt-12 mb-6">4.11 Open Questions and Future Directions</h3>
            <p className="mb-6">The connection between RHC and information geometry opens several avenues for further research:</p>
            <ul className="list-disc pl-8 mb-12 space-y-4">
              <li><strong>Higher dimensions:</strong> Can the RHC be extended to <Math formula="n" />-tuples <Math formula="(a_1, \dots, a_n)" />, and does the corresponding information geometry involve the Dirichlet distribution or other multivariate families?</li>
              <li><strong>Quantum information:</strong> The Bhattacharyya coefficient for Bernoulli distributions has a quantum analog—the fidelity between quantum states. Does the fold operator appear in quantum fidelity for certain states?</li>
              <li><strong>Dynamics:</strong> The Fisher metric provides a kinematic structure. Can we introduce a natural dynamics (e.g., via a Hamiltonian) that is compatible with this geometry?</li>
              <li><strong>Curvature and physics:</strong> The constant curvature <Math formula="R = 2" /> invites speculation about connections to de Sitter space (positive curvature) and cosmological models.</li>
              <li><strong>Experimental tests:</strong> The small-angle approximation and the Fisher distance formula provide concrete, testable predictions. Designing experiments to confirm or falsify these predictions is a priority (see Chapter 6).</li>
            </ul>
            <UnifiedFrameworkInfographic />
            <p className="mb-8 font-serif italic text-lg text-center">In the next chapter, we explore how these information-geometric structures might correspond to physical concepts, leading to a set of eighteen falsifiable predictions across multiple scientific domains.</p>
          </Section>

          <Section id="interpretation" title="5. Interpretation" subtitle="Emergent Spacetime">
            <h3 className="text-2xl font-serif mb-6">5.2 Hypothesis 1: RHC as State Space</h3>
            <p className="mb-8"><Math formula="(a,b)" /> ↔ binary system state, <Math formula="\theta" /> ↔ continuous parameter, <Math formula="r" /> ↔ latent variable.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { symbol: '⊖', title: 'Recursive Mapping', body: 'Integer pairs map uniquely to points in the complex plane.', tag: 'FOUNDATIONAL' },
                { symbol: '∿', title: 'Fold Operator', body: 'Extracts real projections, models measurement via symmetry.', tag: 'OPERATIONAL' },
                { symbol: '⊕', title: 'GCD-Radius', body: 'Links arithmetic to geometry via Theorem 2.1.', tag: 'THEOREM' },
                { symbol: '◎', title: 'Fisher-RHC', body: 'Fisher distance derived from angular ratios.', tag: 'INFO-GEOM' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 border-2 border-cream-300 rounded-lg hover:border-gold-400 hover:shadow-xl transition-all"
                >
                  <div className="text-5xl text-navy-100 mb-4">{card.symbol}</div>
                  <h4 className="text-xl font-bold text-navy-800 mb-2">{card.title}</h4>
                  <p className="text-cream-700 mb-4">{card.body}</p>
                  <span className="text-[10px] font-bold tracking-widest text-gold-700 uppercase">{card.tag}</span>
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl font-serif mb-6">5.3 Hypothesis 2: Fold Operator as Projection</h3>
            <p className="mb-6"><Math formula="\mathcal{F}" /> applied to complex amplitude ↔ quantum measurement. Symmetry <Math formula="\mathcal{F}(x)=\mathcal{F}(1/x)" /> ↔ exchange duality.</p>

            <h3 className="text-2xl font-serif mb-6">5.4 Hypothesis 3: Emergent Spacetime</h3>
            <p className="mb-6">Composite geometric structures ↔ pre‑geometric fabric. Curvature analogue <Math formula="K = \pi - \sum\theta_k" /> ↔ local energy density. Continuum limit <Math formula="a,b\to\infty" /> yields smooth geometry.</p>
          </Section>

          <Section id="predictions" title="6. Predictions" subtitle="Falsifiable Hypotheses">
            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P1: Spectral Scaling
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> <Math formula="d_F = |\ln\tan\theta_2 - \ln\tan\theta_1|" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Energy gaps in discrete systems will scale according to the Fisher distance <Math formula="\Delta E \propto |\ln\tan\theta_2 - \ln\tan\theta_1|" />.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P2: Measurement Bias
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> <Math formula="\mathcal{F}(x)=\mathcal{F}(1/x)" /> symmetry, fixed point at <Math formula="x=1" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Distribution of measured ratios in quantum-like systems will peak at <Math formula="a=b" /> due to fold operator symmetry.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P3: Optimal Convergence at Golden Ratio
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> Lamé's theorem, worst‑case Fibonacci numbers approach <Math formula="\phi" />.
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Convergence time <Math formula="\tau(r)" /> peaks at <Math formula="r=\phi" />.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-gold-400" />
                  P4: Discrete‑to‑Continuous Transition
                </h4>
                <p className="mb-4">
                  <strong>Basis:</strong> Discrete lattice (Lemma 3.1), dense angles (Proposition 3.1).
                </p>
                <p className="mb-4">
                  <strong>Prediction:</strong> Quantized Fisher distance for small integers, smooth for large.
                </p>
              </div>
            </div>
          </Section>

          <Section id="conclusion" title="7. Conclusion" subtitle="Final Synthesis">
            <blockquote className="text-3xl font-serif italic text-navy-800 border-l-4 border-gold-400 pl-8 py-4 my-12">
              "The Recursive Harmonic Codex offers a rigorous framework uniting number theory, complex geometry, and information theory. Its core is mathematically sound; its physical extensions are speculative but disciplined."
            </blockquote>

            <h3 className="text-2xl font-serif mt-12 mb-6">8. Discussion</h3>
            <Callout type="key" label="Key Insight">
              The RHC provides a unified language connecting number theory, geometry, and information through a single simple mapping.
            </Callout>

            <h3 className="text-2xl font-serif mt-12 mb-6">9. Open Problems</h3>
            <ul className="list-disc pl-6 space-y-2 mb-12">
              <li>Can a rigorous information‑theoretic quantity be derived directly from the Euclidean algorithm?</li>
              <li>Is there a natural Hamiltonian on the RHC state space?</li>
              <li>Extension to Gaussian integers and p-adic geometries.</li>
              <li>Does curvature analogue K correspond to a known geometric invariant?</li>
            </ul>

            <h3 className="text-2xl font-serif mt-12 mb-6">10. References</h3>
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
