export class PassengerCountryInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PassengerCountryInvalidException'
  }
}
