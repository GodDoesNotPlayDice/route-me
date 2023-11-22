export class DriverIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DriverIdInvalidException'
	}
}
