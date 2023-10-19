import { Result } from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const updateTrip = async ( dao: TripDao,
  trip: Trip ): Promise<Result<boolean, Error>> => {
  return await dao.update( trip )
}
