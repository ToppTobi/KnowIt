import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/learn-sets', // Standardroute zeigt auf LearnSets
    pathMatch: 'full',
  },
  {
    path: 'learn-sets',
    loadComponent: () => import('./learn-sets/learn-sets.page').then(m => m.LearnSetsPage),
  },
  {
    path: 'create-learn-set',
    loadComponent: () => import('./create-learn-set/create-learn-set.page').then(m => m.CreateLearnSetPage),
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then(m => m.UserPage),
  },
];
