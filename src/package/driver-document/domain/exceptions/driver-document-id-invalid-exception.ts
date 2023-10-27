export class DriverDocumentIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DriverDocumentIdInvalidException'
	}
}
