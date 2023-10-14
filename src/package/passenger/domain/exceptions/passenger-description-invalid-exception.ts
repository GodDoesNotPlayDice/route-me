export class PassengerDescriptionInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PassengerDescriptionInvalidException'
	}
}
