import { z } from 'zod'

export const ValidNumberSchema = z.object( {
  value : z.number()
} )

type ValidNumberType = z.infer<typeof ValidNumberSchema>
export interface ValidNumber extends ValidNumberType{}

interface ValidNumberProps {
  value : number
}

export const newValidNumber = (props : ValidNumberProps): ValidNumber => {
  return ValidNumberSchema.parse( {
    value : props.value
  } )
}
