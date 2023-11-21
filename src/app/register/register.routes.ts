import { Routes } from '@angular/router'
import { RegisterPage } from 'src/app/register/register.page'

export const routes: Routes = [
	{
		path     : '',
		component: RegisterPage,
		children : [
			{
				path         : 'step1',
				loadComponent: () => import('./step1/step1.page').then(
					m => m.Step1Page )
			},
			{
				path         : 'step2',
				loadComponent: () => import('./step2/step2.page').then(
					m => m.Step2Page )
			},
			{
				path         : 'step3',
				loadComponent: () => import('./step3/step3.page').then(
					m => m.Step3Page )
			},
			{
				path      : '',
				redirectTo: '/register/step1',
				pathMatch : 'full'
			}
		]
	},
	{
		path      : '',
		redirectTo: '/register/step1',
		pathMatch : 'full'
	}
]
