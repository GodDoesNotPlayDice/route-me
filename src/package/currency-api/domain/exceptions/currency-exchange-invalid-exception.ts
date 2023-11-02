export class CurrencyExchangeInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CurrencyExchangeInvalidException'
	}
}
