export class TripPriceInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripPriceInvalidException'
	}
}
