export class UserIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'UserIdInvalidException'
	}
}
