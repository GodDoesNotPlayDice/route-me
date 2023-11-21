export class RatingIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'RatingIdInvalidException'
	}
}
