export class ReportIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'ReportIdInvalidException'
	}
}
