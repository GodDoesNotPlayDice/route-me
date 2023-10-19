export class UserDescriptionInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserDescriptionInvalidException'
  }
}
