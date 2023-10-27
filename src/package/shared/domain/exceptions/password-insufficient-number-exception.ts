export class PasswordInsufficientNumberException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PasswordInsufficientNumberException'
	}
}
