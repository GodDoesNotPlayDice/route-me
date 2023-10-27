export class DateInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DateInvalidException'
	}
}
