export class CountryNameCodeInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'CountryNameCodeInvalidException'
  }
}
