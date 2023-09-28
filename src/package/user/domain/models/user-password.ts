import { z } from 'zod'

export const UserPasswordSchema = z.object( {
	value : z.string().min(8),
} )

export type UserPassword = z.infer<typeof UserPasswordSchema>

interface UserPasswordProps {
	value : string
}

export const newUserPassword = (props : UserPasswordProps): UserPassword => {
	return UserPasswordSchema.parse( {
		value : props.value
	} )
}
