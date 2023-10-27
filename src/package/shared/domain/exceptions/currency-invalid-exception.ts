export class CurrencyInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CurrencyInvalidException'
	}
}
