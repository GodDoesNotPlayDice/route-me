import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'

export const userToJson   = ( user: User ): Option<Record<string, any>> => {
	try {
		const json: Record<string, any> = {
			id         : user.id.value,
			email      : user.email.value,
		}
		return Some( json )
	}
	catch ( e ) {
		console.log( 'error user to json' )
		console.log( e )
		return None
	}
}
export const userFromJson = ( json: Record<string, any> ): Option<User> => {
	try {
		return Some(
			newUser( {
				id         : json['id'],
				email      : json['email']
			} )
		)
	}
	catch ( e ) {
		console.log( 'error user from json' )
		console.log( e )
		return None
	}
}
