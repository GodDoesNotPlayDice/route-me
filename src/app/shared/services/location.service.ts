import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { createLocation } from 'src/package/trip-location/application/create-location'
import { LocationDao } from 'src/package/trip-location/domain/dao/location-dao'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'

@Injectable( {
	providedIn: 'root'
} )
export class LocationService {

	constructor( private locationDao: LocationDao ) { }

	async createLocation( props: {
		name: string,
		countryCode: string,
		position: Position
	} ): Promise<Option<TripLocation>> {
		const result = await createLocation( this.locationDao, props )

		if ( result.isErr() ) {
			return None
		}
		return Some( result.unwrap() )
	}
}
