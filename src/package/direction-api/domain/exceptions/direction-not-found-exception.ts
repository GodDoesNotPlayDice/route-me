export class DirectionNotFoundException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DirectionNotFoundException'
	}
}
