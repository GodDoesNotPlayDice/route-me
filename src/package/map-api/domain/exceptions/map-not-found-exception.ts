export class MapNotFoundException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'MapNotFoundException'
	}
}
