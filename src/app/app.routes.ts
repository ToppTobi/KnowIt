import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/learn-sets',
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
    path: 'edit-learn-set/:id',
    loadComponent: () => import('./edit-learn-set/edit-learn-set.page').then(m => m.EditLearnSetPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then(m => m.UserPage),
  },
  {
    path: 'learn-flashcards/:id',
    loadComponent: () => import('./learn-flashcards/learn-flashcards.page').then( m => m.LearnFlashcardsPage)
  },


];
