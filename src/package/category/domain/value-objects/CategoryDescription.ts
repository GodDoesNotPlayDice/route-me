import { z } from 'zod'

export class CategoryDescription {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
