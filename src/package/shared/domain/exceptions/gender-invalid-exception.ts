export class GenderInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'GenderInvalidException'
	}
}
