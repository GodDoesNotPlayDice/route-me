import { z } from 'zod'

export const UserEmailSchema = z.object( {
  value : z.string().email()
} )

export type UserEmail = z.infer<typeof UserEmailSchema>

interface UserEmailProps {
  value : string
}

export const newUserEmail = (props : UserEmailProps): UserEmail => {
  return UserEmailSchema.parse( {
    value : props.value
  } )
}
