export class UserNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserNameInvalidException'
  }
}
