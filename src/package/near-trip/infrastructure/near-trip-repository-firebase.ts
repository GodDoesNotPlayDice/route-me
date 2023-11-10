import { AngularFireDatabase } from '@angular/fire/compat/database'
import { DataSnapshot } from '@angular/fire/compat/database/interfaces'
// import { GeoFire } from 'geofire'
import * as geofire from 'geofire-common'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	nearTripFromJson,
	nearTripToJson
} from 'src/package/near-trip/application/near-trip-mapper'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export class NearTripRepositoryFirebase implements NearTripRepository {
	constructor( private firebase: AngularFireDatabase ) {}

	collectionKey = 'neartrips'

	async getNearTrips( center: Position,
		radiusInKm: number ): Promise<Result<NearTrip[], Error[]>> {
		const radiusInM                       = radiusInKm * 1000
		const bounds                          = geofire.geohashQueryBounds(
			[ center.lat, center.lng ], radiusInM )
		let promises: Promise<DataSnapshot>[] = []
		for ( const b of bounds ) {
			const q = this.firebase.database.ref( this.collectionKey )
			              .orderByChild( 'geohash' )
			              .startAt( b[0] )
			              .endAt( b[1] )

			promises.push( q.get() )
		}

		const response: Result<NearTrip[], Error[]> = await Promise.all( promises )
		                                                           .then(
			                                                           ( snapshots ) => {
				                                                           const matchingDocs: NearTrip[] = []
				                                                           const errors: Error[]          = []
				                                                           for ( const snap of snapshots ) {
					                                                           snap.forEach(
						                                                           ( child ) => {
							                                                           const value        = child.val()
							                                                           const distanceInKm = geofire.distanceBetween(
								                                                           [ value.latitude,
									                                                           value.longitude ],
								                                                           [ center.lat,
									                                                           center.lng ] )
							                                                           const distanceInM  = distanceInKm *
								                                                           1000
							                                                           if ( distanceInM <=
								                                                           radiusInM )
							                                                           {
								                                                           const nearTrip = nearTripFromJson(
									                                                           value )
								                                                           if ( nearTrip.isErr() ) {
									                                                           errors.push(
										                                                           ...nearTrip.unwrapErr() )
								                                                           }
								                                                           matchingDocs.push(
									                                                           nearTrip.unwrap() )
							                                                           }
						                                                           } )
				                                                           }
				                                                           if ( errors.length >
					                                                           0 )
				                                                           {
					                                                           return Err(
						                                                           errors )
				                                                           }
				                                                           return Ok(
					                                                           matchingDocs )
			                                                           } )
		                                                           .catch(
			                                                           ( error ) => {
				                                                           return Err(
					                                                           [ new FirebaseOperationException() ] )
			                                                           } )

		if ( response.isErr() ) {
			return Err( response.unwrapErr() )
		}

		return Ok( response.unwrap() )
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

	async create( nearTrip: NearTrip ): Promise<Result<boolean, Error>> {
		let completed: string | null = null

		const jsonResult = nearTripToJson( nearTrip )

		if ( jsonResult.isErr() ) {
			return Err( jsonResult.unwrapErr() )
		}

		const json      = jsonResult.unwrap()
		const hash      = geofire.geohashForLocation(
			[ nearTrip.latitude, nearTrip.longitude ] )
		json['geohash'] = hash

		await this.firebase.database.ref( this.collectionKey )
		          .push( json,
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

	async update( nearTrip: NearTrip ): Promise<Result<boolean, Error>> {
		const keySaved = await this.getKey( nearTrip.id )

		if ( keySaved.isErr() ) {
			return Err( keySaved.unwrapErr() )
		}
		let completed: string | null = null

		const jsonResult = nearTripToJson( nearTrip )


		if ( jsonResult.isErr() ) {
			return Err( jsonResult.unwrapErr() )
		}

		const json      = jsonResult.unwrap()
		const hash      = geofire.geohashForLocation(
			[ nearTrip.latitude, nearTrip.longitude ] )
		json['geohash'] = hash

		await this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }` )
		          .set( json,
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          } )
		if ( completed === null ) {
			return Err( new FirebaseOperationException() )
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
