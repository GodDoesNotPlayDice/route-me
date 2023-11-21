export class TripNotMatchStateException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripNotMatchStateException'
	}
}
