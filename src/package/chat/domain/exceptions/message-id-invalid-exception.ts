export class MessageIdInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'MessageIdInvalidException'
  }
}
