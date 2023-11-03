import { Routes } from '@angular/router'
import { CanLoginGuard } from 'src/app/shared/guard'
import { CanRegisterGuard } from 'src/app/shared/guard/can-register.guard'

export const routes: Routes = [
	{
		path      : '',
		redirectTo: 'login',
		pathMatch : 'full'
	},
	{
		canActivate : [ CanRegisterGuard ],
		path         : 'login',
		loadComponent: () => import('./login/login.page').then( m => m.LoginPage )
	},
	{
		path        : 'tabs',
		canActivate : [ CanLoginGuard ],
		loadChildren: () => import('./tabs/tabs.routes').then( m => m.routes )
	},
	{
		canActivate : [ CanRegisterGuard ],
		path        : 'register',
		loadChildren: () => import('./register/register.routes').then(
			m => m.routes )
	},
	{
		canActivate : [ CanRegisterGuard ],
		path         : 'reset-password',
		loadComponent: () => import('./reset-password/reset-password.page').then(
			m => m.ResetPasswordPage )
	},
	{
		path         : 'trip-details',
		canActivate  : [ CanLoginGuard ],
		loadComponent: () => import('./trip-details/trip-details.page').then(
			m => m.TripDetailsPage )
	},
	{
		path         : 'chat',
		canActivate  : [ CanLoginGuard ],
		loadComponent: () => import('./chat/chat.page').then( m => m.ChatPage )
	},
	{
		path: 'test',
		loadComponent: () => import('./test/test.page').then( m => m.TestPage)
	},
	{
		path         : '**',
		loadComponent: () => import('./error/error.page').then( m => m.ErrorPage )
	}
]
