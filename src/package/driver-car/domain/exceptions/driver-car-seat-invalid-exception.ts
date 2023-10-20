export class DriverCarSeatInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DriverCarSeatInvalidException'
  }
}
