import { Result } from 'oxide.ts'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { Trip } from 'src/package/trip/domain/models/trip'

export const createTrip = async ( dao: TripDao,
  trip: Trip ): Promise<Result<boolean, Error>> => {
  return await dao.create( trip )
}

// const startDateInRange = newLimitDate( {
//   value   : startDateValid.unwrap().value,
//   numTimes: 12096e5
// } )
//
// if ( startDateInRange.isErr() ) {
//   err.push( startDateInRange.unwrapErr() )
// }
//
// const endDateInRange = newLimitDate( {
//   value   : endDateValid.unwrap().value,
//   numTimes: 12096e5
// } )
//
// if ( endDateInRange.isErr() ) {
//   err.push( endDateInRange.unwrapErr() )
// }
//
// if ( err.length > 0 ) {
//   return Err( err )
// }
//
// const startDate = newComparableDate( {
//   value     : startDateInRange.unwrap().value,
//   otherDate : endDateInRange.unwrap().value,
//   comparator: newComparator( {
//     value: 'Before'
//   } )
// } )
//
// if ( startDate.isErr() ) {
//   err.push( startDate.unwrapErr() )
// }
//
// const endDate = newComparableDate( {
//   value     : endDateInRange.unwrap().value,
//   otherDate : startDateInRange.unwrap().value,
//   comparator: newComparator( {
//     value: 'After'
//   } )
// } )
//
// if ( endDate.isErr() ) {
//   err.push( endDate.unwrapErr() )
// }
