import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthRepository } from 'src/package/authentication/domain'
import { ulid } from 'ulidx'

export class RegisterUser {
	constructor( private repository: AuthRepository ) {}

	async execute(
		email: string,
		password: string,
	): Promise<Result<boolean, string>> {
		try {
			const result   = await this.repository.register(
				ulid(),
				email,
				password
			)
			const response = result.unwrap()
			return Promise.resolve( Ok( response ) )
		}
		catch ( e ) {
			return Promise.resolve( Err( 'register error' ) )
		}
	}
}
