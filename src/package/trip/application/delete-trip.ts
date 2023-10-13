import {
  Result
} from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export const deleteTrip = async ( dao: TripDao, id: TripID): Promise<Result<boolean, Error>> => {
  return  await dao.delete(id)
}
