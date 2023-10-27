export class CountryNameInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'CountryNameInvalidException'
	}
}
