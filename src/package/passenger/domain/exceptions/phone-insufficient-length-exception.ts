export class PhoneInsufficientLengthException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PhoneInsufficientLengthException'
  }
}
