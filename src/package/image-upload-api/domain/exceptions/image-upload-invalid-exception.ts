export class ImageUploadInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'ImageUploadInvalidException'
	}
}
