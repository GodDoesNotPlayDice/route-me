import { z } from 'zod'

export const GenderSchema = z.object( {
  value : z.string()
} )

type GenderType = z.infer<typeof GenderSchema>
export interface Gender extends GenderType{}

interface GenderProps {
  value : string
}

export const newGender = (props : GenderProps): Gender => {
  return GenderSchema.parse( {
    value : props.value
  } )
}
