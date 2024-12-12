import {Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {LayoutIfNotSignedInPage} from "./layout-if-not-signed-in/layout-if-not-signed-in.page";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/learn-sets',
    pathMatch: 'full',
  },
  {
    path: 'learn-sets',
    loadComponent: () => import('./learn-sets/learn-sets.page').then(m => m.LearnSetsPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-learn-set',
    loadComponent: () => import('./create-learn-set/create-learn-set.page').then(m => m.CreateLearnSetPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-learn-set/:id',
    loadComponent: () => import('./edit-learn-set/edit-learn-set.page').then(m => m.EditLearnSetPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then(m => m.UserPage),
  },
  {
    path: 'learn-flashcards/:id',
    loadComponent: () => import('./learn-flashcards/learn-flashcards.page').then( m => m.LearnFlashcardsPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'layout-if-not-signed-in',
    loadComponent: () => import('./layout-if-not-signed-in/layout-if-not-signed-in.page').then( m => m.LayoutIfNotSignedInPage)
  },



];
