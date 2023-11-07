import {
	Injectable,
	OnDestroy
} from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	first,
	Subscription
} from 'rxjs'
import { AuthService } from 'src/app/shared/services/auth.service'
import { getDriverCarById } from 'src/package/driver-car/application/get-driver-car-by-id'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { createDriver } from 'src/package/driver/application/create-driver'
import { updateDriver } from 'src/package/driver/application/update-driver'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Email } from 'src/package/shared/domain/models/email'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Injectable( {
	providedIn: 'root'
} )
export class DriverService implements OnDestroy {

	constructor(
		private driverDao: DriverDao,
		private authService: AuthService,
		private driverCarDao: DriverCarDao
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

	private sub: Subscription
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
		const driverCar = await getDriverCarById( this.driverCarDao, id )

		if ( driverCar.isErr() ) {
			console.log( 'driver car not found' )
			return false
		}

		const result = await createDriver( this.driverDao, {
			driverCar: driverCar.unwrap(),
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


	async driverUpdate( props: {
		documents?: DriverDocument[]
		activeTrip?: Trip
		driverCar?: DriverCar
	} ): Promise<Option<Driver>> {
		const result = await updateDriver( this.driverDao,
			this.currentDriver.unwrap(), props )

		if ( result.isErr() ) {
			console.log( 'update driver error' )
			console.log( result.unwrapErr() )
			return None
		}

		await this.checkActiveTripSignal( result.unwrap() )
		return Some( result.unwrap() )
	}

	private async checkActiveTripSignal( result: Driver ): Promise<boolean> {
		if ( result.activeTrip.isSome() && result.activeTrip.unwrap().state ===
			TripStateEnum.Progress )
		{
			//TODO: mandar a trip progress table
			return true
		}
		return false
	}

	async getByEmail( email: Email ): Promise<boolean> {
		const result = await this.driverDao.getByEmail( email )

		if ( result.isErr() ) {
			console.log( result.unwrapErr() )
			console.log( 'get driver error' )
			return false
		}

		await this.checkActiveTripSignal( result.unwrap() )

		this.currentDriver = Some( result.unwrap() )
		return true
	}

	public ngOnDestroy(): void {
		this.sub.unsubscribe()
	}
}
