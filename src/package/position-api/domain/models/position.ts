import { z } from 'zod'

export const PositionSchema = z.object( {
  lat : z.number(),
  lng: z.number()
} )

type PositionType = z.infer<typeof PositionSchema>
export interface Position extends PositionType {}

export interface PositionProps {
  lat : number,
  lng: number
}

export const newPosition = (props : PositionProps): Position => {
  return PositionSchema.parse( {
    lat : props.lat,
    lng: props.lng
  } )
}
