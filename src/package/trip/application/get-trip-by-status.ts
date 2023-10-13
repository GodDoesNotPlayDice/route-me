import {
  Result
} from 'oxide.ts'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const getAllByState = async ( dao: TripDao, state: TripState): Promise<Result<Trip[], Error>> => {
  return await dao.getAllByState(state)
}
