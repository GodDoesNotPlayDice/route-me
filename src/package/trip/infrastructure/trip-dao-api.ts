import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'
import {
	tripFromJSON,
	tripToJSON
} from 'src/package/trip/application/trip-mapper'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export class TripDaoApi implements TripDao {

	private url = environment.apiUrl

	constructor( private http: HttpClient ) {}

	/**
	 * Get all trips by state
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async getAllByState( state: TripState ): Promise<Result<Trip[], Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	/**
	 * Get by id trip
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async getById( id: TripID ): Promise<Result<Trip, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	/**
	 * Delete trip
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async delete( id: TripID ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

	/**
	 * Update trip
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async update( trip: Trip ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	/**
	 * Create trip
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async create( trip: Trip ): Promise<Result<boolean, Error[]>> {
		try {
			const tripJsonResult = tripToJSON( trip )

			if ( tripJsonResult.isErr() ) {
				return Err( tripJsonResult.unwrapErr() )
			}

			const response = await this.http.post( `${ this.url }/trip/create`,
				tripJsonResult.unwrap() )
			                           .toPromise()

			const result = response !== undefined
			return Ok( result )
		}
		catch ( e ) {
			return Err( [ new ApiOperationException( 'trip create firebase' ) ] )
		}
	}

	/**
	 * Get all trips
	 * @throws {ApiOperationException} - if api operation failed
	 */
	async getAll(): Promise<Result<Trip[], Error[]>> {

		const response = await this.http.get( this.url )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new ApiOperationException( 'trip get all api' ) ] )
		}

		const result = tripFromJSON( response as Record<string, any> )
		console.log( 'result', result )

		// const trip = tripFromJSON( response )
		//
		// if ( trip.isErr() ) {
		// 	return Err( trip.unwrapErr() )
		// }
		//
		// return Ok( trip.unwrap() )
		return Ok( [] )
	}
}
