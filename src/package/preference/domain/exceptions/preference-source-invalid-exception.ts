export class PreferenceSourceInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PreferenceSourceInvalidException'
	}
}
