export class TripStateNotMatchException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripStateNotMatchException'
	}
}
