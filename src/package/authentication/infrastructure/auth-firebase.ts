import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import {
	User,
	userFromJson,
	UserID
} from 'src/package/user'

export class AuthFirebase implements AuthRepository {
	constructor( private firebase: AngularFireDatabase ) {
	}

	async delete( id: UserID ): Promise<Result<boolean, string>> {
		return Promise.resolve( Ok( true ) )
	}

	async update( user: User ): Promise<Result<boolean, string>> {
		return Promise.resolve( Ok( true ) )
	}

	async create( user: User ): Promise<Result<boolean, string>> {
		return Promise.resolve( Ok( true ) )
	}

	login( email: string,
		password: string ): Promise<Result<User, string>> {
		//TODO: corregir data
		const data: Record<string, any> = {
			id         : 'abc',
			email      : 'hola@gmail.com',
			name       : 'juan',
			lastName   : 'pedro',
			password   : '12345678',
			description: 'Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.',
			phone      : '(+56)1234-1234',
			birthDay   : new Date( '1990-03-25' ),
			country    : 'CL',
			gender     : 'Hombre',
			preferences: []
		}
		const user                      = userFromJson( data )

		if ( user.isNone() ) {
			return Promise.resolve( Err( 'data error' ) )
		}
		return Promise.resolve( Ok( user.unwrap() ) )
	}

	register( id: string,
		email: string,
		password: string ): Promise<Result<boolean, string>> {
		return Promise.resolve( Ok( true ) )
	}
}
