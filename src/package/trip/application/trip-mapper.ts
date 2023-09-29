import {
  None,
  Option,
  Some
} from 'oxide.ts'
import {
  DriverID,
  newDriverID
} from 'src/package/driver'
import {
  newTrip,
  Trip
} from 'src/package/trip/domain'

export const tripFromJSON = ( json: Record<string, any> ): Option<Trip> => {
  try {
    const drivers : DriverID[] = Array.from(json['driverID']).map((id: any) => {
      return newDriverID({
        value: id
      })
    })

    return Some(
      newTrip({
        seat: json['seat'],
        driverID: drivers
      })
    )
  }
  catch ( e ) {
    return None
  }
}

export const tripToJSON = ( trip: Trip ): Record<string, any> => {
  return {
    seat: trip.seat,
    driverID: trip.driverID
  }
}
