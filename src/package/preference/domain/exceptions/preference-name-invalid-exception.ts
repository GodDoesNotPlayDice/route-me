export class PreferenceNameInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'PreferenceNameInvalidException'
  }
}
