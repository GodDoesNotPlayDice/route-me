import { Result } from 'oxide.ts'
import { Currency } from 'src/package/shared/domain/models/currency'
import { ValidNumber } from 'src/package/shared/domain/models/valid-number'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'

export abstract class TripRepository {
  abstract calculateTripPrice( distance : ValidNumber, currency : Currency ): Promise<Result<TripPrice, Error[]>>
}
