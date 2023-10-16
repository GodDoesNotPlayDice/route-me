import { Result } from 'oxide.ts'
import { Trip } from 'src/app/shared/models/trip/trip'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'

export const getAllTrips = async ( dao: TripDao ): Promise<Result<Trip[], Error[]>> => {
  return await dao.getAll()
}
