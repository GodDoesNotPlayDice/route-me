export class PermissionStateInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PermissionStateInvalidException'
  }
}
