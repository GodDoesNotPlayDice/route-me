export class TripDescriptionInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'TripDescriptionInvalidException'
  }
}
