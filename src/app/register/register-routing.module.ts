import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    children: [
      {
        path: 'step1',
        loadChildren: () => import('./step1/step1.module').then( m => m.Step1PageModule)
      },
      {
        path: 'step2',
        loadChildren: () => import('./step2/step2.module').then( m => m.Step2PageModule)
      },
      {
        path: 'step3',
        loadChildren: () => import('./step3/step3.module').then( m => m.Step3PageModule)
      },
      {
        path: '',
        redirectTo: '/register/step1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/register/step1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RegisterPageRoutingModule {}
