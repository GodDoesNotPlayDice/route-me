export class UserCountryInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserCountryInvalidException'
  }
}
