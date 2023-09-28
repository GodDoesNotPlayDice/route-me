import { z } from 'zod'

export const UserIDSchema = z.object( {
  value : z.string(),
} )

export type UserID = z.infer<typeof UserIDSchema>

interface UserIDProps {
  value : string
}

export const newUserID = (props : UserIDProps): UserID => {
  return UserIDSchema.parse( {
    value : props.value
  } )
}
