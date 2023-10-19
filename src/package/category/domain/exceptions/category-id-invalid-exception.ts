export class CategoryIdInvalidException extends Error {
  constructor( message?: string ) {
    super( message )
    this.name = 'CategoryIdInvalidException'
  }
}
