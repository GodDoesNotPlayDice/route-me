export class RatingValueInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'RatingValueInvalidException'
	}
}
