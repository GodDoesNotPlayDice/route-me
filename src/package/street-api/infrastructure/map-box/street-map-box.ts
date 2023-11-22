import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { streetsDataFromJson } from 'src/package/street-api/application/streets-data-mapper'
import { StreetNotFoundException } from 'src/package/street-api/domain/exceptions/street-not-found-exception'
import { StreetsData } from 'src/package/street-api/domain/models/streets-data'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'

export class StreetMapBox implements StreetRepository {
	constructor( private http: HttpClient ) {}

	/**
	 * Get streets by term
	 * @throws {StreetNotFoundException} - if street not found
	 * @throws {StreetNameInvalidException} - if some name is invalid
	 * @throws {StreetPlaceInvalidException} - if some place is invalid
	 * @throws {PositionInvalidException} - if some position is invalid
	 */
	async getStreetsByTerm( searchTerm: string,
		center: Position ): Promise<Result<StreetsData, Error[]>> {

		const response = await this.http.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${ searchTerm }.json?proximity=${ center.lng },${ center.lat }&access_token=${ environment.mapBoxApiKey }` )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new StreetNotFoundException() ] )
		}

		const streetResult = streetsDataFromJson( response )

		if ( streetResult.isErr() ) {
			return Err( streetResult.unwrapErr() )
		}

		return Ok( streetResult.unwrap() )
	}

	/**
	 * Get streets by position
	 * @throws {StreetNotFoundException} - if street not found
	 * @throws {StreetNameInvalidException} - if some name is invalid
	 * @throws {StreetPlaceInvalidException} - if some place is invalid
	 * @throws {PositionInvalidException} - if some position is invalid
	 */
	async getStreetsByPosition( center: Position ): Promise<Result<StreetsData, Error[]>> {
		const response = await this.http.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${ center.lng },${ center.lat }.json?access_token=${ environment.mapBoxApiKey }&limit=1` )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new StreetNotFoundException() ] )
		}

		const streetResult = streetsDataFromJson( response )

		if ( streetResult.isErr() ) {
			return Err( streetResult.unwrapErr() )
		}

		return Ok( streetResult.unwrap() )
	}
}
