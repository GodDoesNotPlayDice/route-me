export class TripNotFoundException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'TripNotFoundException'
  }
}
