import { z } from 'zod'

export const LocationIDSchema = z.object( {
  value: z.string()
} )

type LocationIDType = z.infer<typeof LocationIDSchema>

export interface LocationID extends LocationIDType {}

export interface LocationIDProps {
  value: string
}

export const newLocationID = ( props: LocationIDProps ): LocationID => {
  return LocationIDSchema.parse( {
    value: props.value
  } )
}
