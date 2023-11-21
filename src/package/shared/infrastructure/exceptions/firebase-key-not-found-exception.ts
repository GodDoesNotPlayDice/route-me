export class FirebaseKeyNotFoundException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'FirebaseKeyNotFoundException'
	}
}
