import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { LandingComponent } from './pages/landing/landing.component';
import { MeshComponent } from './pages/mesh/mesh.component';
import { GraphComponent } from './graph.component';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: LandingComponent },
      { path: 'mesh', component: MeshComponent },
      { path: 'graph', component: GraphComponent }
    ]
  }
];