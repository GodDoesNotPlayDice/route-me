export class UnknowException extends Error {
  constructor( message: string ) {
    super( message )
    this.name = 'UnknowException'
  }
}

export abstract class MyUserException extends Error {
  protected constructor( message: string ) {
    super( message )
    this.name = 'MyUserException'
  }
}

export class InvalidDateUserException extends MyUserException {
  constructor( message: string ) {
    super( message )
    this.name = 'InvalidDateUserException'
  }
}
