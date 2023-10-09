import {
  newStreetData,
  Street,
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
}

export const newStreetsDataMapBox = ( json: Record<string, any> ): StreetsData => {
  // const features = Object.values( result )[2]
  // const { center, place_name, text } = features[0]
  return newStreetData({
    center: json['features'][ 'center' ],
    place_name: json['features'][ 'place_name' ],
    text: json['features'][ 'text' ]
  })
}
