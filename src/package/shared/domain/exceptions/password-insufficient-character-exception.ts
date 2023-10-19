export class PasswordInsufficientCharacterException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PasswordInsufficientCharacterException'
  }
}
