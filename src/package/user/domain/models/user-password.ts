import { z } from 'zod'

export const UserPasswordSchema = z.object( {
	value : z.string().min(8),
} )

type UserPasswordType = z.infer<typeof UserPasswordSchema>
export interface UserPassword extends UserPasswordType{}

interface UserPasswordProps {
	value : string
}

export const newUserPassword = (props : UserPasswordProps): UserPassword => {
	return UserPasswordSchema.parse( {
		value : props.value
	} )
}
