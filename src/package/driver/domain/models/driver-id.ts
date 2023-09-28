import { z } from 'zod'

export const DriverIDSchema = z.object( {
  value : z.string()
} )

export type DriverID = z.infer<typeof DriverIDSchema>

interface DriverIDProps {
  value : string
}

export const newDriverID = (props : DriverIDProps): DriverID => {
  return DriverIDSchema.parse( {
    value : props.value
  } )
}
