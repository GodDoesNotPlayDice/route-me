import {
  LocationID,
  newLocationID
} from 'src/package/shared/domain/models/location/location-id'
import {
  newValidNumber,
  ValidNumber
} from 'src/package/shared/domain/models/valid-number'
import {
  LocationName,
  newLocationName
} from './location-name'

export interface Location {
  id: LocationID
  name: LocationName
  latitude: ValidNumber
  longitude: ValidNumber
}

export interface LocationProps {
	id : string
	name : string
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
    latitude: newValidNumber({
      value: props.latitude
    }),
    longitude: newValidNumber({
      value: props.longitude
    })
  }
}
