export class CountryNumberCodeInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CountryNumberCodeInvalidException'
	}
}
