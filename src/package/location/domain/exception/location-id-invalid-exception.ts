export class LocationIdInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'LocationIdInvalidException'
  }
}
