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
import { DriverService } from 'src/app/shared/services/driver.service'

@Injectable( {
	providedIn: 'root'
} )
export class CanDriverGuard implements CanActivate {
	constructor( private driverService: DriverService, private router: Router ) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if ( this.driverService.currentDriver.isSome() && this.driverService.currentDriver.unwrap().enabled)
		{
			return true
		}
		else {
			return this.router.navigate( [ '/tabs/register-driver' ] )
		}
	}

}
