import { z } from 'zod'

export const LocationSchema = z.object( {
  value : z.string()
} )

export type Location = z.infer<typeof LocationSchema>

interface LocationProps {
  value : string
}

export const newLocation = (props : LocationProps): Location => {
  return LocationSchema.parse( {
    value : props.value
  } )
}
