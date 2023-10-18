export class UserLastNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserLastNameInvalidException'
  }
}
