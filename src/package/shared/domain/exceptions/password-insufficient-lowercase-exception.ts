export class PasswordInsufficientLowercaseException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PasswordInsufficientLowercaseException'
	}
}
