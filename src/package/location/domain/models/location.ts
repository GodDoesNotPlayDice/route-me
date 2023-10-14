import { LocationCountryCode } from 'src/package/location/domain/models/location-country-code'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { LocationName } from 'src/package/location/domain/models/location-name'
import { Position } from 'src/package/position-api/domain/models/position'

export interface Location {
  id: LocationID
  name: LocationName
  countryCode: LocationCountryCode
  position: Position
}
