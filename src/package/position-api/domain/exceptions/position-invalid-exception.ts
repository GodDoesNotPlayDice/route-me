export class PositionInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'PositionInvalidException'
	}
}
