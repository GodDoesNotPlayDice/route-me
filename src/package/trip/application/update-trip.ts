import {
  Err,
  Result,
  Some
} from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const updateTrip = async ( dao: TripDao,
  trip: Trip, props: {
    description?: string
    category?: Category
  } ): Promise<Result<boolean, Error>> => {

  const description = newPassengerDescription( {
    value: props.description ?? trip.description.value
  } )

  if ( description.isErr() ) {
    return Err( description.unwrapErr() )
  }

  const newTrip: Trip = {
    id           : trip.id,
    description  : description.unwrap(),
    category     : props.category === undefined ? trip.category : Some(
      props.category ),
    chatID       : trip.chatID,
    driver       : trip.driver,
    endLocation  : trip.endLocation,
    price        : trip.price,
    startDate    : trip.startDate,
    startLocation: trip.startLocation,
    state        : trip.state,
    passengers   : trip.passengers,
    endDate      : trip.endDate
  }

  return await dao.update( newTrip )
}
