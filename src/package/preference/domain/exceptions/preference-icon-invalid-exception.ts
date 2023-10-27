export class PreferenceIconInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PreferenceIconInvalidException'
	}
}
