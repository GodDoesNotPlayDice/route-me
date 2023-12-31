import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/shared/services/auth.service'

@Injectable( {
	providedIn: 'root'
} )
export class CanLoginGuard implements CanActivate {
	constructor( private auth: AuthService,
		private router: Router
	)
	{}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if ( this.auth.currentUser.isSome() &&
			this.auth.currentPassenger.isSome() )
		{
			return true
		}
		else {
			return this.router.navigate( [ '/login' ] )
		}
	}

}
