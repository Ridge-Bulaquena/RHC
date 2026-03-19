import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FigureContainer } from '../FigureContainer';

interface NodeData {
  name: string;
  value?: string;
  children?: NodeData[];
}

const data: NodeData = {
  name: "55/34",
  value: "1.6176",
  children: [
    {
      name: "1",
      value: "q₁",
      children: [
        {
          name: "1",
          value: "q₂",
          children: [
            {
              name: "1",
              value: "q₃",
              children: [
                {
                  name: "1",
                  value: "q₄",
                  children: [
                    {
                      name: "1",
                      value: "q₅",
                      children: [
                        {
                          name: "1",
                          value: "q₆",
                          children: [
                            {
                              name: "1",
                              value: "q₇",
                              children: [
                                {
                                  name: "2",
                                  value: "q₈",
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const ContinuedFractionTree: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tree = d3.tree<NodeData>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    const root = d3.hierarchy(data);
    tree(root);

    // Links
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d: any) => {
        return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#F0B800")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
      .attr("stroke-dasharray", "4 4");

    // Nodes
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", 6)
      .attr("fill", "#0B1120")
      .attr("stroke", "#F0B800")
      .attr("stroke-width", 2)
      .on("mouseover", function() {
        d3.select(this).transition().attr("r", 10).attr("fill", "#F0B800");
      })
      .on("mouseout", function() {
        d3.select(this).transition().attr("r", 6).attr("fill", "#0B1120");
      });

    node.append("text")
      .attr("dy", ".31em")
      .attr("x", (d: any) => d.children ? -15 : 15)
      .attr("text-anchor", (d: any) => d.children ? "end" : "start")
      .text((d: any) => d.data.name)
      .attr("fill", "#0B1120")
      .attr("font-family", "Roboto Mono")
      .attr("font-size", "14px")
      .attr("font-weight", "bold");

    node.append("text")
      .attr("dy", "1.5em")
      .attr("x", (d: any) => d.children ? -15 : 15)
      .attr("text-anchor", (d: any) => d.children ? "end" : "start")
      .text((d: any) => d.data.value || "")
      .attr("fill", "#A87E00")
      .attr("font-family", "Poppins")
      .attr("font-size", "10px")
      .attr("font-style", "italic");

    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, []);

  return (
    <FigureContainer
      id="fig-1-3"
      title="Figure 1.3 — Continued Fraction Expansion Tree"
      caption="Continued fraction expansion of 55/34 = [1;1,1,1,1,1,1,2]. Each quotient corresponds to a step in the Euclidean algorithm."
      variant="light"
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <svg ref={svgRef} className="w-full h-full max-h-[400px]"></svg>
      </div>
    </FigureContainer>
  );
};
