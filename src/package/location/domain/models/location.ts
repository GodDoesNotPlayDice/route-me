import {
  LocationCountryCode,
  newLocationCountryCode
} from 'src/package/location/domain/models/location-country-code'
import {
  LocationID,
  newLocationID
} from 'src/package/location/domain/models/location-id'
import {
  newValidNumber,
  ValidNumber
} from 'src/package/shared/domain/models/valid-number'
import {
  LocationName,
  newLocationName
} from 'src/package/location/domain/models/location-name'

export interface Location {
  id: LocationID
  name: LocationName
  countryCode: LocationCountryCode
  latitude: ValidNumber
  longitude: ValidNumber
}

export interface LocationProps {
	id : string
	name : string
  countryCode: string
	longitude : number
	latitude : number
}

export const newLocation = (props : LocationProps): Location => {
	return {
    id: newLocationID({
      value: props.id
    }),
    name: newLocationName( {
      value: props.name
    } ),
    countryCode: newLocationCountryCode({
      value: props.countryCode
    }),
    latitude: newValidNumber({
      value: props.latitude
    }),
    longitude: newValidNumber({
      value: props.longitude
    })
  }
}
