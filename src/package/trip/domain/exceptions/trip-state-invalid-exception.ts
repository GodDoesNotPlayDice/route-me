export class TripStateInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripStateInvalidException'
	}
}
