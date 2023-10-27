export class TripLocationIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripLocationIdInvalidException'
	}
}
