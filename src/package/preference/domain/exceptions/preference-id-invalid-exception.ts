export class PreferenceIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PreferenceIdInvalidException'
	}
}
