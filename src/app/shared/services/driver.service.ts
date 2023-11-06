import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { first } from 'rxjs'
import { AuthService } from 'src/app/shared/services/auth.service'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { createDriver } from 'src/package/driver/application/create-driver'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Email } from 'src/package/shared/domain/models/email'

@Injectable( {
	providedIn: 'root'
} )
export class DriverService {

	constructor(
		private driverDao: DriverDao,
		private authService: AuthService
		// private driverCarDao : DriverCarDao,
		// private driverDocumentDao : DriverDocumentDao
	)
	{
		this.authService.userChange$.pipe( first(
			( user ) => user !== null
		) )
		    .subscribe( async ( user ) => {
			    if ( user !== null ) {
				    await this.getByEmail( user.email )
			    }
		    } )
	}

	currentDriver: Option<Driver> = None

	async driverRegister(
		id: DriverCarID,
		documents: {
			name: string,
			reference: string
		}[]
	): Promise<boolean> {

		if ( this.authService.currentPassenger.isNone() ) {
			return false
		}

		const result = await createDriver( this.driverDao, {
			carID    : id,
			documents: documents,
			passenger: this.authService.currentPassenger.unwrap()
		} )

		if ( result.isErr() ) {
			console.log( 'driver register error' )
			return false
		}

		this.currentDriver = Some( result.unwrap() )
		return true
	}

	async getByEmail( email: Email ): Promise<boolean> {
		const result = await this.driverDao.getByEmail( email )

		if ( result.isErr() ) {
			console.log( result.unwrapErr() )
			console.log( 'get driver error' )
			return false
		}

		this.currentDriver = Some( result.unwrap() )
		return true
	}
}
