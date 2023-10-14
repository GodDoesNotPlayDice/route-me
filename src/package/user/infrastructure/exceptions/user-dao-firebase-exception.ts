export abstract class UserDaoFirebaseException extends Error {
  protected constructor( message: string ) {
    super( message )
    this.name = 'UserInfrastructureException'
  }
}
