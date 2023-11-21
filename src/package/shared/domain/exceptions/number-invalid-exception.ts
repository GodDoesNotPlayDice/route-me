export class NumberInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'NumberInvalidException'
	}
}
