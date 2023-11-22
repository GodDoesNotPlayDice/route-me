export class PropertyKeyInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PropertyKeyInvalidException'
	}
}
