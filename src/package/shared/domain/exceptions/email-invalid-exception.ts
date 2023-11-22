export class EmailInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'EmailInvalidException'
	}
}

