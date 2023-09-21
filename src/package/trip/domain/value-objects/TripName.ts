import { z } from 'zod'

export class TripName {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
