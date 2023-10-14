export class ApiOperationException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'ApiOperationException'
  }
}
