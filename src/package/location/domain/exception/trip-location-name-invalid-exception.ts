export class TripLocationNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'TripLocationNameInvalidException'
  }
}
