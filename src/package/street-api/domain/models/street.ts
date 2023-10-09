import {
  newPosition,
  PositionProps,
  PositionSchema
} from 'src/package/location-api/domain/models/position'
import { newStreetsDataMapBox } from 'src/package/street-api/infrastructure/map-box/models/street-map-box'
import { z } from 'zod'

export const StreetSchema = z.object( {
  center  : PositionSchema,
  place_name: z.string(),
  text: z.string()
} )
type StreetType = z.infer<typeof StreetSchema>
export interface Street extends StreetType {}
export interface StreetProps {
  center: PositionProps
  place_name: string
  text: string
}

export interface StreetsData {
  streets : Street[]
}

export interface StreetsDataProps   {
  streets : StreetProps[]
}

export const newStreet = ( props: StreetProps ): Street => {
  return StreetSchema.parse( {
    center: newPosition({
      lat: props.center.lat,
      lng: props.center.lng
    }),
    place_name: props.place_name,
    text: props.text
  } )
}

export const newStreetsData = ( props: StreetsDataProps ): StreetsData => {
  return {
    streets: props.streets.map( ( street ) => newStreet( {
      center: street.center,
      place_name: street.place_name,
      text: street.text
    } ) )
}
}

export const newStreetsDataFromJson = ( json: Record<string, any> ): StreetsData => {
  return newStreetsDataMapBox( json)
}
