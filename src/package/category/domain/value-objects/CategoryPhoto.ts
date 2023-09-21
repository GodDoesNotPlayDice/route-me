import { z } from 'zod'

export class CategoryPhoto {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
