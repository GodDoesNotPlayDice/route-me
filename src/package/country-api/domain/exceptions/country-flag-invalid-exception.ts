export class CountryFlagInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CountryFlagInvalidException'
	}
}
