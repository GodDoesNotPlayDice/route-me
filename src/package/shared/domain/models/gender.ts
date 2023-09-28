import { z } from 'zod'

export const GenderSchema = z.object( {
  value : z.string()
} )

export type Gender = z.infer<typeof GenderSchema>

interface GenderProps {
  value : string
}

export const newGender = (props : GenderProps): Gender => {
  return GenderSchema.parse( {
    value : props.value
  } )
}
