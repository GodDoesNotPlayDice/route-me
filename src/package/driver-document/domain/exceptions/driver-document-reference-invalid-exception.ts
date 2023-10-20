export class DriverDocumentReferenceInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DriverDocumentReferenceInvalidException'
  }
}
