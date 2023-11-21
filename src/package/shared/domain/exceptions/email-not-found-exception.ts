export class EmailNotFoundException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'EmailNotFoundException'
	}
}
