import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	driverCarFromJson,
	driverCarToJson
} from 'src/package/driver-car/application/driver-car-mapper'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class DriverCarDaoFirebase implements DriverCarDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'driverscar'

	async create( driver: DriverCar ): Promise<Result<boolean, Error>> {
		let completed: string | null = null

		const json = driverCarToJson( driver)

		if ( json.isErr() ) {
			return Err( json.unwrapErr() )
		}

		await this.firebase.database.ref( this.collectionKey )
		          .push( json.unwrap(),
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( new FirebaseOperationException() )
		}

		return Ok( true )
	}

	async getAll(): Promise<Result<DriverCar[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[] = []
			                 const driverCars: DriverCar[]  = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const driverCar = driverCarFromJson( value as Record<string, any> )
				                 if ( driverCar.isErr() ) {
					                 error.push( ...driverCar.unwrapErr() )
					                 break
				                 }
				                 driverCars.push( driverCar.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( driverCars )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}
}
