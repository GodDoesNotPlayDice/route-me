export class DriverCarModelInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DriverCarModelInvalidException'
  }
}
