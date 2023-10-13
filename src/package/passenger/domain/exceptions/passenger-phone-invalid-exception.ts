export class PassengerPhoneInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PassengerPhoneInvalidException'
	}
}
