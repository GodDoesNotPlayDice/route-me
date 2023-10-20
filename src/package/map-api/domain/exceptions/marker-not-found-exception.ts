export class MarkerNotFoundException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'MarkerNotFoundException'
  }
}
