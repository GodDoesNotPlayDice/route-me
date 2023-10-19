export class InfrastructureOperationException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'InfrastructureOperationException'
  }
}
