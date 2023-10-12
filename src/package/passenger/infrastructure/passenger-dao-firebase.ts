import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { passengerFromJson } from 'src/package/passenger/application/passenger-mapper'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { UserID } from 'src/package/user/domain/models/user-id'

export class PassengerDaoFirebase implements PassengerDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	async getAll(): Promise<Result<Passenger[], Error[]>> {
		//TODO: ver como llegan varios entradas por tabla en firebase
		const errors: Error[] = []
		return Err( errors )
	}

	async getById( id: UserID ): Promise<Result<Passenger, Error[]>> {
		return await this.firebase.database.ref( 'passengers' )
		                 .orderByChild( 'userID' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 if ( snapshotValue['preferences'] === 'none' ) {
				                 snapshotValue['preferences'] = []
			                 }
			                 const passenger = passengerFromJson( snapshotValue )

			                 if ( passenger.isErr() ) {
				                 return Err( passenger.unwrapErr() )
			                 }
			                 return Promise.resolve( Ok( passenger.unwrap() ) )
		                 } )
	}

	async delete( id: PassengerID ): Promise<Result<boolean, Error>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( keySaved.unwrapErr() )
		}

		let completed: string | null = null

		await this.firebase.database.ref( 'passengers' )
		          .child( keySaved.unwrap() )
		          .remove(
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( new UnknownException() )
		}

		return Ok( true )
	}

	async create( passenger: Passenger ): Promise<Result<Passenger, Error>> {
			let completed: string | null = null
			await this.firebase.database.ref( 'passengers' )
			          .push(
				          {
					          id         : passenger.id.value,
					          userID     : passenger.userID.value,
					          name       : passenger.name.value,
					          lastName   : passenger.lastName.value,
					          description: passenger.description.value,
					          phone      : passenger.phone.value,
					          birthDay   : passenger.birthDay.value.toJSON(),
					          country    : passenger.country.value,
					          gender     : passenger.gender,
					          preferences: 'none'
				          },
				          ( error ) => {
					          if ( !error ) {
						          completed = 'completed'
					          }
				          }
			          )

			if ( completed === null ) {
				return Err(new UnknownException())
			}

			return Ok( passenger )
	}

	async update( passenger: Passenger ): Promise<Result<boolean, Error>> {
		const keySaved = await this.getKey( passenger.userID )

		if ( keySaved.isErr() ) {
			return Err( keySaved.unwrapErr() )
		}

		let completed: string | null = null

		await this.firebase.database.ref( 'passengers' )
		          .child( keySaved.unwrap() )
		          .set( {
				          id         : passenger.id.value,
				          userID     : passenger.userID.value,
				          name       : passenger.name.value,
				          lastName   : passenger.lastName.value,
				          description: passenger.description.value,
				          phone      : passenger.phone.value,
				          birthDay   : passenger.birthDay.value,
				          country    : passenger.country.value,
				          gender     : passenger.gender,
				          preferences: passenger.preferences.map( ( preference ) => {
					          return {
						          id: preference.value
					          }
				          } )
			          },
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          } )


		if ( completed === null ) {
			return Err( new UnknownException() )
		}

		return Ok( true )
	}

	private async getKey( id: UserID ): Promise<Result<string, Error>> {
		return await this.firebase.database.ref( `passengers` )
		                 .orderByChild( 'userID' )
		                 .equalTo( id.value )
		                 .get()
		                 .then(
			                 async ( snapshot ) => {

				                 let key: string | null = null

				                 snapshot.forEach( ( childSnapshot ) => {
					                 key = childSnapshot.key
				                 } )

				                 if ( key === null ) {
					                 return Err( new UnknownException() )
				                 }
				                 return Ok( key )
			                 } )
	}
}
