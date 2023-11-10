import { Injectable } from '@angular/core'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Observable,
	Subscription
} from 'rxjs'
import { PositionService } from 'src/app/shared/services/position.service'
import { deleteTripInProgress } from 'src/package/trip-in-progress/application/delete-trip-in-progress'
import { getTripInProgressById } from 'src/package/trip-in-progress/application/get-trip-in-progress-by-id'
import { listenTripInProgress } from 'src/package/trip-in-progress/application/listen-trip-in-progress'
import { upsertTripInProgress } from 'src/package/trip-in-progress/application/upsert-trip-in-progress'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

@Injectable( {
	providedIn: 'root'
} )
export class TripInProgressService {

	constructor(
		private inProgressDao: TripInProgressDao,
		private positionService: PositionService
	)
	{ }

	private updateActiveTrip: Subscription

	async getTripInProgressById( id: TripID ): Promise<Result<TripInProgress, Error[]>> {
		return await getTripInProgressById( this.inProgressDao, id )
	}

	async listen( tripID: string ): Promise<Result<Observable<TripInProgress | null>, Error[]>> {
		return await listenTripInProgress( this.inProgressDao, tripID )
	}

	async close( id: TripID ): Promise<void> {
		const result = await this.inProgressDao.close( id )
		console.log( 'close trip in progress. service', result )
	}

	async checkActiveTripSignal( tripActive: Trip ): Promise<boolean> {
		if ( tripActive.state === TripStateEnum.Progress )
		{
			this.updateActiveTrip =
				this.positionService.newPosition$.subscribe( async ( value ) => {
					if ( !value ) {
						return
					}
					const result = await upsertTripInProgress( this.inProgressDao, {
						id           : tripActive.id,
						status       : tripActive.state,
						startLocation: tripActive.startLocation,
						endLocation  : tripActive.endLocation,
						latitude     : value.lat,
						longitude    : value.lng
					} )

					if ( result.isErr() ) {
						console.log( 'upsert active trip. driver' )
						console.log( result.unwrapErr() )
					}
				} )
			return true
		}
		else if ( tripActive.state === TripStateEnum.Completed ) {
			const resultDelete = await deleteTripInProgress( this.inProgressDao,
				tripActive.id )
			if ( resultDelete.isErr() ) {
				console.log( 'delete trip in progress error' )
				console.log( resultDelete.unwrapErr() )
				return false
			}
			this.updateActiveTrip.unsubscribe()
			return true
		}
		return false
	}

	async removeTripInProgress( id: TripID ): Promise<Result<boolean, Error[]>> {
		const result = await deleteTripInProgress( this.inProgressDao, id )
		if ( result.isErr() ) {
			console.log( 'error delete trip in progress service' )
			console.log( result.unwrapErr() )
			return Err( result.unwrapErr() )
		}
		this.updateActiveTrip.unsubscribe()
		return Ok( true )
	}
}
