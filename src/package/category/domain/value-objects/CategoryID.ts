import { z } from 'zod'

export class CategoryID {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
