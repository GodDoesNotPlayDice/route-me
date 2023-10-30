export class BooleanInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'BooleanInvalidException'
	}
}
