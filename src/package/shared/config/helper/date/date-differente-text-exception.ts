export class DateDifferenteTextException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DateDifferenteTextException'
  }
}
