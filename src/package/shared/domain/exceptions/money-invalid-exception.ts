export class MoneyInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'MoneyInvalidException'
	}
}
