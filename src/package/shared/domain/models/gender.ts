import { z } from 'zod'

export type GenderType = 'Male' | 'Female' | 'None'

export const GenderSchema = z.enum( [ 'Male', 'Female', 'None' ] )

export type Gender = z.infer<typeof GenderSchema>

interface GenderProps {
  value : string
}

export const newGender = (props : GenderProps): Gender => {
  return GenderSchema.parse( {
    value : props.value
  } )
}

