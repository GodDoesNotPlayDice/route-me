export class FirebaseOperationException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'FirebaseOperationException'
  }
}
