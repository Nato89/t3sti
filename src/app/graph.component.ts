import { Component, AfterViewInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  standalone: true,
  styles: [`svg { width: 100vw; height: 100vh; background: #0a0e27; display: block; margin: 0; }`],
  template: '<svg></svg>'
})
export class GraphComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const svg = d3.select(this.el.nativeElement).select('svg');

    const layers = [
      ['Informe_Anual_2024.pdf', 'Contrato_Servicios.docx', 'Presupuesto_Q1.xlsx', 'Acta_Reunion.pdf', 'Reporte_Mensual.pdf'],
      ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7'],
      ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      ['Financiero', 'Legal', 'Operaciones', 'RRHH']
    ];

    const margin = 120;
    const layerWidth = (w - 2 * margin) / (layers.length - 1);
    const nodes: any[] = [];

    layers.forEach((layer, layerIdx) => {
      const nodeHeight = (h - 100) / (layer.length + 1);
      layer.forEach((name, nodeIdx) => {
        nodes.push({ name, x: margin + layerIdx * layerWidth, y: 50 + nodeHeight * (nodeIdx + 1), layer: layerIdx });
      });
    });

    const links: any[] = [];
    let idx = 0;
    for (let i = 0; i < layers.length - 1; i++) {
      for (let j = 0; j < layers[i].length; j++) {
        for (let k = 0; k < layers[i + 1].length; k++) {
          links.push({ source: nodes[idx + j], target: nodes[idx + layers[i].length + k] });
        }
      }
      idx += layers[i].length;
    }

    const linkElements = svg.selectAll('line').data(links).enter().append('line')
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      .attr('stroke', '#00d4ff').attr('stroke-width', 1).attr('opacity', 0);

    linkElements.transition().duration(2000).delay((d, i) => i * 3).attr('opacity', 0.25);

    const nodeGroup = svg.selectAll('g').data(nodes).enter().append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`).attr('opacity', 0);

    nodeGroup.transition().duration(800).delay((d, i) => i * 40).attr('opacity', 1);

    nodeGroup.append('circle')
      .attr('r', 0)
      .attr('fill', d => ['#ff6b6b', '#ffd93d', '#a8e6cf', '#4ecdc4'][d.layer])
      .attr('stroke', '#fff').attr('stroke-width', 2.5)
      .transition().duration(600).delay((d, i) => i * 40)
      .attr('r', d => d.layer === 0 || d.layer === 3 ? 45 : 32);

    nodeGroup.append('text')
      .text(d => d.name.length > 18 ? d.name.substring(0, 16) + '...' : d.name)
      .attr('text-anchor', 'middle').attr('dy', 55)
      .attr('fill', '#fff').attr('font-size', '12px').attr('opacity', 0)
      .transition().duration(400).delay((d, i) => i * 40 + 600).attr('opacity', 0.95);

      setInterval(() => {
        nodeGroup.selectAll('circle')
          .transition().duration(1500)
          .attr('r', (d: any) => (d.layer === 0 || d.layer === 3 ? 45 : 32) + Math.random() * 4)
          .transition().duration(1500)
          .attr('r', (d: any) => d.layer === 0 || d.layer === 3 ? 45 : 32);
      }, 3000);
    }, 100);
  }
}
