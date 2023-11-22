export class StreetNotFoundException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'StreetNotFoundException'
	}
}
