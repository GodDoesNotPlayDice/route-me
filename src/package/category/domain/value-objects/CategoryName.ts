import { z } from 'zod'

export class CategoryName {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
