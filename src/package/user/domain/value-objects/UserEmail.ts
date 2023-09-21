import { z } from 'zod'

export class UserEmail {
  constructor( readonly value: string ) {
    z.string()
     .email()
     .parse( value )
  }
}
