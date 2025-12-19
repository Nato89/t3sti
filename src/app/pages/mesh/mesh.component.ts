import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  label?: string;
  type: 'main' | 'dot';
}

interface GraphLink {
  source: string;
  target: string;
}

@Component({
  selector: 'app-mesh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.css']
})
export class MeshComponent implements OnInit {
  
  nodes: GraphNode[] = [];
  links: GraphLink[] = [];
  width = 1920;
  height = 1080;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight * 2;
    }
    this.generateMesh();
  }

  generateMesh() {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    
    // Exact document titles to display
    const sampleTitles = [
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'nuevo',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo',
      'Doc Legal',
      'Contrato',
      'Sentencia',
      'Decreto',
      'Ley 123',
      'Código',
      'Resolución',
      'Norma',
      'Artículo',
      'Acuerdo'
    ];
    
    const cols = 10;
    const rows = Math.ceil(sampleTitles.length / cols);

    const margin = 66; 
    const availableWidth = this.width - (margin * 2);
    const availableHeight = this.height - (margin * 2);
    
    const xStep = availableWidth / cols;
    const yStep = availableHeight / rows;

    const getId = (r: number, c: number) => `${r}-${c}`;
    
    let titleIndex = 0;

    // Generate nodes in grid
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const id = getId(r, c);
        
        // Calculate position with margin
        let x = margin + (c * xStep);
        let y = margin + (r * yStep);

        const jitterX = (Math.random() - 0.5) * (xStep * 0.6);
        const jitterY = (Math.random() - 0.5) * (yStep * 0.6);
        
        x += jitterX;
        y += jitterY;

        const isCenter = r === Math.floor(rows / 2) && c === Math.floor(cols / 2);
        
        if (isCenter) {
          nodes.push({
            id: 'main',
            x, y,
            size: 70,
            color: '#e8e8e8',
            label: 'TEORÍA DEL DERECHO MODO COMPLEJO',
            type: 'main'
          });
        } else if (titleIndex < sampleTitles.length) {
          const title = sampleTitles[titleIndex];
          const isBig = Math.random() > 0.6;
          
          nodes.push({
            id,
            x, y,
            size: isBig ? 24 : 16,
            color: isBig ? '#d4a574' : '#cccccc',
            label: title,
            type: 'dot'
          });
          
          titleIndex++;
        } else {
          continue;
        }

        if (c < cols) links.push({ source: getId(r, c), target: getId(r, c + 1) });
        if (r < rows) links.push({ source: getId(r, c), target: getId(r + 1, c) });
        if (r < rows && c < cols && Math.random() > 0.4) {
          links.push({ source: getId(r, c), target: getId(r + 1, c + 1) });
        }
      }
    }

    const centerR = Math.floor(rows / 2);
    const centerC = Math.floor(cols / 2);
    const centerId = getId(centerR, centerC);

    links.forEach(link => {
      if (link.source === centerId) link.source = 'main';
      if (link.target === centerId) link.target = 'main';
    });

    this.nodes = nodes;
    this.links = links;
  }

  getNodeById(id: string): GraphNode | undefined {
    return this.nodes.find(n => n.id === id);
  }

  getLinePath(link: GraphLink): string {
    const source = this.getNodeById(link.source);
    const target = this.getNodeById(link.target);
    
    if (!source || !target) return '';
    return `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
  }
}
