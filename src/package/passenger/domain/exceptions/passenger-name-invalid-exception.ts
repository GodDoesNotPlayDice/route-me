export class PassengerNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PassengerNameInvalidException'
  }
}
