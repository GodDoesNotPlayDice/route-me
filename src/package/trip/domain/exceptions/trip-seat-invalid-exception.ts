export class TripSeatInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'TripSeatInvalidException'
  }
}
