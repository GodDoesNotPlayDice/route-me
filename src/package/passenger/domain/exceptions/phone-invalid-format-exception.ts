export class PhoneInvalidFormatException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PhoneInvalidFormatException'
	}
}
