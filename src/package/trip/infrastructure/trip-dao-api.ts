import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { tripToJSON } from 'src/package/trip/application/trip-mapper'
import { TripState } from 'src/package/trip/domain/backend-models/trip-state'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from '../domain/models/trip-id'

export class TripDaoApi implements TripDao {

	private url = environment.apiUrl

	constructor( private http: HttpClient ) {}

	/**
	 * Get all trips by state
	 * @throws {UnknownException} - if unknown error
	 */
	async getAllByState( state: TripState ): Promise<Result<Trip[], Error>> {
		return Err( new UnknownException() )
	}

	/**
	 * Get by id trip
	 * @throws {UnknownException} - if unknown error
	 */
	async getById( id: TripID ): Promise<Result<Trip, Error>> {
		return Err( new UnknownException() )
	}

	/**
	 * Delete trip
	 * @throws {UnknownException} - if unknown error
	 */
	async delete( id: TripID ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

	/**
	 * Update trip
	 * @throws {UnknownException} - if unknown error
	 */
	async update( trip: Trip ): Promise<Result<boolean, Error>> {
		return Err( new UnknownException() )
	}

	/**
	 * Create trip
	 * @throws {UnknownException} - if unknown error
	 */
	async create( trip: Trip ): Promise<Result<boolean, Error>> {
		try {
			const j = tripToJSON( trip )
			this.http.post( this.url, j )
			    .subscribe( ( data ) => {
				    console.log( 'data', data )
			    } )
			return Ok( true )
		}
		catch ( e ) {
			return Err( new UnknownException() )
		}
	}

	/**
	 * Get all trips
	 * @throws {UnknownException} - if unknown error
	 */
	async getAll(): Promise<Result<Trip[], Error>> {
		try {
			this.http.get( this.url )
			    .subscribe( ( data ) => {
				    console.log( 'data', data )
			    } )
			return Ok( [] )
		}
		catch ( e ) {
			return Err( new UnknownException() )
		}
	}
}
