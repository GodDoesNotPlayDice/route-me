export class ReportMessageInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'ReportMessageInvalidException'
	}
}
