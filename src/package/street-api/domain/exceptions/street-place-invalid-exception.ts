export class StreetPlaceInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'StreetPlaceInvalidException'
	}
}
