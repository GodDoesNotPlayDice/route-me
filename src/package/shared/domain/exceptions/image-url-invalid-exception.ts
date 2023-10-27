export class ImageUrlInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'ImageUrlInvalidException'
	}
}

