export class PhoneExceedsMaximumLengthException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PhoneExceedsMaximumLengthException'
	}
}
