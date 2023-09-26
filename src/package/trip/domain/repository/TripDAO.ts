import { Result } from 'oxide.ts'
import { Observable } from 'rxjs'
import { Trip } from 'src/package/trip/domain/entities'
import { TripID } from 'src/package/trip/domain/value-objects'

export abstract class TripDAO {
  abstract getAll(): Promise<Result<Trip[], string>>
  abstract getById(id : TripID): Promise<Result<Observable<Trip>, string>>
  abstract delete(id : TripID): Promise<Result<boolean, string>>
  abstract save(trip: Trip): Promise<Result<boolean, string>>
  abstract update(trip: Trip): Promise<Result<boolean, string>>
}
