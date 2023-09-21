import { z } from 'zod'

export class RatingID {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
