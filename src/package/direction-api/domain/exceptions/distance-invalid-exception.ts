export class DistanceInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DistanceInvalidException'
	}
}
