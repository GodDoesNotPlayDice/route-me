export class ComparatorInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'ComparatorInvalidException'
	}
}
