import { z } from 'zod'

export const UserEmailSchema = z.object( {
  value : z.string().email()
} )

type UserEmailType = z.infer<typeof UserEmailSchema>
export interface UserEmail extends UserEmailType{}

interface UserEmailProps {
  value : string
}

export const newUserEmail = (props : UserEmailProps): UserEmail => {
  return UserEmailSchema.parse( {
    value : props.value
  } )
}
