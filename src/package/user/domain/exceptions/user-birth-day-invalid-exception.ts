export class UserBirthDayInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'UserBirthDayInvalidException'
  }
}
