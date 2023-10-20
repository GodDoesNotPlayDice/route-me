export class DriverCarIDInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DriverCarIDInvalidException'
  }
}
