import {
	UserEmailSchema,
	UserIDSchema,
} from 'src/package/user/domain/models'
import { z } from 'zod'

export const UserSchema = z.object( {
	id: UserIDSchema,
	email: UserEmailSchema,
} )

export type User = z.infer<typeof UserSchema>

export interface UserProps {
	id: string,
	email: string,
}
export const newUser = (props : UserProps): User => {
	return UserSchema.parse( {
		id: UserIDSchema.parse({
			value: props.id
		}),
		email: UserEmailSchema.parse({
			value: props.email
		})
	} )
}
