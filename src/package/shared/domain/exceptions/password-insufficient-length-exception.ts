export class PasswordInsufficientLengthException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PasswordInsufficientLengthException'
	}
}
