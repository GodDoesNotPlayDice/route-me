export class TripLocationCountryCodeInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'TripLocationCountryCodeInvalidException'
  }
}
