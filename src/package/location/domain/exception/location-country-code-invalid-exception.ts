export class LocationCountryCodeInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'LocationCountryCodeInvalidException'
  }
}
