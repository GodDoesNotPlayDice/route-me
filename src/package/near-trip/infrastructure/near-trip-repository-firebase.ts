import { AngularFireDatabase } from '@angular/fire/compat/database'
import { ref } from 'firebase/database'
import { GeoFire } from 'geofire'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { nearTripToJson } from 'src/package/near-trip/application/near-trip-mapper'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export class NearTripRepositoryFirebase implements NearTripRepository {

	constructor( private firebase: AngularFireDatabase ) {
		this.geoFire = new GeoFire( ref( this.firebase.database, this.collectionKey ) )
	}

	private geoFire: GeoFire
	collectionKey = 'neartrips'

	async getNearTrips( center: Position,
		radius: number ): Promise<Result<NearTrip[], Error[]>> {
		const geoQuery = this.geoFire.query({
		  // center: [ -33.030484, -71.537360 ],
			center: [ center.lat, center.lng],
		  radius: radius
		})
		// @ts-ignore
		geoQuery.on("ready", () => {
			console.log('ready')
		})
		return Err( [ new FirebaseOperationException() ] )
	}

	async delete( id: TripID ): Promise<Result<boolean, Error>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( keySaved.unwrapErr() )
		}

		let completed: string | null = null

		await this.firebase.database.ref( this.collectionKey )
		          .child( keySaved.unwrap() )
		          .remove(
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( new FirebaseOperationException( 'delete' ) )
		}

		return Ok( true )
	}

	async create( nearTrip: NearTrip ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json = nearTripToJson( nearTrip )

		if ( json.isErr() ) {
			return Err( [ json.unwrapErr() ] )
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
			return Err( [ new FirebaseOperationException() ] )
		}

		return Ok( true )
	}

	private async getKey( id: TripID ): Promise<Result<string, Error>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then(
			                 async ( snapshot ) => {

				                 let key: string | null = null

				                 snapshot.forEach( ( childSnapshot ) => {
					                 key = childSnapshot.key
				                 } )

				                 if ( key === null ) {
					                 return Err( new FirebaseKeyNotFoundException() )
				                 }
				                 return Ok( key )
			                 } )
		                 .catch( ( error ) => {
			                 return Err( new FirebaseOperationException() )
		                 } )
	}
}
