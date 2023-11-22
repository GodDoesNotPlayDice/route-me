export class IpInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'IpInvalidException'
	}
}
