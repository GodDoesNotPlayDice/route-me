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
  console.log('json')
  console.log(json)
  console.log('------')
  console.log(json['features'])
  console.log('------')
  const features = Object.values( json )[2]
  console.log(features)
  // const { center, place_name, text } = features[0]
  const a = features.map( ( feature : Record<string, any>) => newStreetMapBox( feature ) )

  return newStreetsData(a)
}
