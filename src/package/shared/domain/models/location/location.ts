import {
  newValidNumber,
  ValidNumber
} from 'src/package/shared/domain/models/valid-number'
import {
  LocationName,
  newLocationName
} from './location-name'

export interface Location {
  name: LocationName
  latitude: ValidNumber
  longitude: ValidNumber
}

export interface LocationProps {
	name : string
	longitude : number
	latitude : number
}

export const newLocation = (props : LocationProps): Location => {
	return {
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
