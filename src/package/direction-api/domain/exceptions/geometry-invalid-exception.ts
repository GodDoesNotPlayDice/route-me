export class GeometryInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'GeometryInvalidException'
	}
}
