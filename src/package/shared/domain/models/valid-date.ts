import { z } from 'zod'

export const ValidDateSchema = z.object( {
  value : z.date()
} )

type ValidDateType = z.infer<typeof ValidDateSchema>
export interface ValidDate extends ValidDateType{}

interface ValidDateProps {
  value : Date
}

export const newValidDate = (props : ValidDateProps): ValidDate => {
  return ValidDateSchema.parse( {
    value : props.value
  } )
}
