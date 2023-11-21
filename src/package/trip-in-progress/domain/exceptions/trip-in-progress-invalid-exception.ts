export class TripInProgressInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripInProgressInvalidException'
	}
}
