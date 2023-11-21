export class MessageContentInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'MessageContentInvalidException'
	}
}
