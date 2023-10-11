import { z } from 'zod'

export const DriverIDSchema = z.object( {
  value: z.string()
} )

type DriverIDType = z.infer<typeof DriverIDSchema>

export interface DriverID extends DriverIDType {}

interface DriverIDProps {
  value: string
}

export const newDriverID = ( props: DriverIDProps ): DriverID => {
  return DriverIDSchema.parse( {
    value: props.value
  } )
}
