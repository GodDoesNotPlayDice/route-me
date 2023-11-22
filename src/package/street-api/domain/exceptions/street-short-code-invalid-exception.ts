export class StreetShortCodeInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'StreetShortCodeInvalidException'
	}
}

