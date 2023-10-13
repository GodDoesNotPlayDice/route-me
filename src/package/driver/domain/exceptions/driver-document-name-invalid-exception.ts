export class DriverDocumentNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'DriverDocumentNameInvalidException'
  }
}
