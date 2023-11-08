import { Result } from 'oxide.ts'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import { TripInProgress } from 'src/package/trip-in-progress/domain/models/trip-in-progress'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export abstract class TripInProgressDao {
	abstract upsert( trip: TripInProgress ): Promise<Result<boolean, Error[]>>
	abstract update( trip: TripInProgress ): Promise<Result<boolean, Error[]>>
	abstract create( trip: TripInProgress ): Promise<Result<boolean, Error[]>>
	abstract delete( trip: TripID ): Promise<Result<boolean, Error[]>>
	abstract getByID( trip: TripID ): Promise<Result<TripInProgress, Error[]>>

	protected tripChange = new BehaviorSubject<TripInProgress | null>( null )

	abstract listen( id: TripID ): Promise<Result<Observable<TripInProgress | null>, Error[]>>

	abstract close(id: TripID): Promise<Result<boolean, Error[]>>
}
