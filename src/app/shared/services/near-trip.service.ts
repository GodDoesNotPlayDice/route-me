import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { createNearTrip } from 'src/package/near-trip/application/create-near-trip'
import { deleteNearTrip } from 'src/package/near-trip/application/delete-near-trip'
import { getNearTrips } from 'src/package/near-trip/application/get-near-trips'
import { updateNearTrip } from 'src/package/near-trip/application/update-near-trip'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripID } from 'src/package/trip/domain/models/trip-id'

@Injectable( {
	providedIn: 'root'
} )
export class NearTripService {

	constructor( private nearTripRepository: NearTripRepository ) { }

	async getNearTrips( center: Position,
		radiusInKm: number ): Promise<Result<NearTrip[], Error[]>> {
		return await getNearTrips( this.nearTripRepository, center, radiusInKm )
	}

	async create( nearTrip: NearTrip ): Promise<Result<boolean, Error>> {
		return await createNearTrip( this.nearTripRepository, nearTrip )
	}

	async delete( id: TripID ): Promise<Result<boolean, Error>> {
		return await deleteNearTrip( this.nearTripRepository, id )
	}

	async update( nearTrip: NearTrip, props: {
		latitude?: number
		longitude?: number
	} ): Promise<Result<boolean, Error>> {
		return await updateNearTrip( this.nearTripRepository, nearTrip, props )
	}
}
