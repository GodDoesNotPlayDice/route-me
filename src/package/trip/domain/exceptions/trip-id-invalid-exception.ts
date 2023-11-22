export class TripIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripIdInvalidException'
	}
}
