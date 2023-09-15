import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: 'search',
        loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
      },
      {
        path: 'publish',
        loadComponent: () => import('./publish/publish.page').then( m => m.PublishPage)
      },
      {
        path: 'history',
        loadComponent: () => import('./trip-history/trip-history.page').then( m => m.TripHistoryPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
