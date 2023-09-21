import { z } from 'zod'

export class UserDescription {
  constructor( readonly value: string ) {
    z.string()
     .min( 10 )
     .parse( value )
  }
}
