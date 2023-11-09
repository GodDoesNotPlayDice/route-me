import { Injectable } from '@angular/core';
import { Result } from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripID } from 'src/package/trip/domain/models/trip-id'

@Injectable({
  providedIn: 'root'
})
export class NearTripService {

  constructor(private nearTripRepository : NearTripRepository) { }
	async getNearTrips( center: Position, radius: number ): Promise<Result<NearTrip[], Error[]>>{
		return await this.nearTripRepository.getNearTrips(center, radius)
	}
	async create( nearTrip: NearTrip ): Promise<Result<boolean, Error[]>>{
		return await this.nearTripRepository.create(nearTrip)
	}
	async delete( id: TripID ): Promise<Result<boolean, Error>>{
		return await this.nearTripRepository.delete(id)
	}
}
