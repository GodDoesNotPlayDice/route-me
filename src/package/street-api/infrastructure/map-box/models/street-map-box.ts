import {
  newStreet,
  newStreetsData,
  Street,
  StreetProps,
  StreetsData
} from 'src/package/street-api/domain/models/street'
import { Feature } from 'src/package/street-api/infrastructure/map-box/models/feature-map-box'

export interface StreetsDataMapBox {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export const newStreetMapBox = ( json: Record<string, any> ): Street => {
  return newStreet( {
    center:{
      lat: json['center'][1],
      lng: json['center'][0]
    },
    place_name: json['place_name'],
    text: json['text']
  })
}

export const newStreetsDataMapBox = ( json: Record<string, any> ): StreetsData => {
  const streets = Object.values( json['features'] ).map(
    value => {
      return newStreetMapBox( value as Record<string, any>)
    }
  )

  return newStreetsData(streets)
}
