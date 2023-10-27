export class NearTripInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'NearTripInvalidException'
	}
}
