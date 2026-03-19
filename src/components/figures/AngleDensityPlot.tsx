import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FigureContainer } from '../FigureContainer';
import { Info, BarChart2, TrendingUp, RefreshCw } from 'lucide-react';

export const AngleDensityPlot: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maxN, setMaxN] = useState(50);

  function gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      x %= y;
      [x, y] = [y, x];
    }
    return x;
  }

  const generateData = (n: number) => {
    const angles: number[] = [];
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        if (gcd(a, b) === 1) {
          angles.push(Math.atan(b / a));
        }
      }
    }
    return angles;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = generateData(maxN);

    const x = d3.scaleLinear()
      .domain([0, Math.PI / 2])
      .range([0, width - margin.left - margin.right]);

    const bins = d3.bin()
      .domain([0, Math.PI / 2])
      .thresholds(40)(data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .range([height - margin.top - margin.bottom, 0]);

    // Axes
    chart.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${(Number(d) * 180 / Math.PI).toFixed(0)}°`))
      .attr("font-family", "Roboto Mono")
      .attr("font-size", "10px");

    chart.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("font-family", "Roboto Mono")
      .attr("font-size", "10px");

    // Bars
    chart.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", d => x(d.x0 || 0) + 1)
      .attr("y", height - margin.top - margin.bottom)
      .attr("width", d => Math.max(0, x(d.x1 || 0) - x(d.x0 || 0) - 1))
      .attr("height", 0)
      .attr("fill", "#F0B800")
      .attr("fill-opacity", 0.6)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.length))
      .attr("height", d => height - margin.top - margin.bottom - y(d.length));

    // Theoretical Density Line (Uniform in t = ln tan theta)
    // For simplicity, we just show the uniform distribution in theta space
    // Proposition 3.1 says angles are dense.
    
    // Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Poppins")
      .attr("font-size", "12px")
      .attr("fill", "#1C2845")
      .text("Angle θ = arctan(b/a)");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-family", "Poppins")
      .attr("font-size", "12px")
      .attr("fill", "#1C2845")
      .text("Frequency");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [maxN]);

  return (
    <FigureContainer
      id="fig-3-7"
      title="Figure 3.7 — Density and Distribution of Angles"
      caption="Proposition 3.1 & 3.2: The set of angles Θ is dense in [0, π/2]. As N increases, the distribution of angles reflects the underlying arithmetic structure, becoming uniform in the Fisher metric space."
      variant="light"
    >
      <div className="relative w-full h-[600px] bg-cream-50 rounded-xl overflow-hidden shadow-inner p-8 flex flex-col items-center">
        <div className="w-full flex-1 flex items-center justify-center">
          <svg ref={svgRef} className="w-full h-full max-h-[400px]"></svg>
        </div>

        {/* Controls */}
        <div className="mt-8 w-full max-w-md space-y-4">
          <div className="flex justify-between text-[10px] font-mono text-navy-400 uppercase tracking-widest">
            <span>Lattice Range (N)</span>
            <span className="text-navy-900 font-bold">{maxN}</span>
          </div>
          <input 
            type="range" min="10" max="100" step="10" value={maxN} 
            onChange={(e) => setMaxN(parseInt(e.target.value))}
            className="w-full h-1 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-400"
          />
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setMaxN(50)}
              className="flex items-center gap-2 px-4 py-2 bg-navy-800 text-white rounded-lg text-[10px] font-mono uppercase hover:bg-navy-700 transition-all"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono text-navy-400 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Observe how the histogram fills as N increases
        </div>
      </div>
    </FigureContainer>
  );
};
