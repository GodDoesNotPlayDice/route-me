export class PasswordInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PasswordInvalidException'
  }
}
