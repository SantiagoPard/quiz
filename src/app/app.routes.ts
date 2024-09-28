import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'detalle-materia/:id',
    loadComponent: () => import('./detalle-materia/detalle-materia.page').then( m => m.DetalleMateriaPage)
  },



];
