export class PassengerLastNameInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PassengerLastNameInvalidException'
	}
}
