export class CategoryNameInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CategoryNameInvalidException'
	}
}
