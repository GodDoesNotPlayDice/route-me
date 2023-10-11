import { z } from 'zod'

export const UserIDSchema = z.object( {
  value : z.string(),
} )

type UserIDType = z.infer<typeof UserIDSchema>
export interface UserID extends UserIDType{}

interface UserIDProps {
  value : string
}

export const newUserID = (props : UserIDProps): UserID => {
  return UserIDSchema.parse( {
    value : props.value
  } )
}
