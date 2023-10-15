export class UserEmailNotFoundException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserEmailNotFoundException'
  }
}
