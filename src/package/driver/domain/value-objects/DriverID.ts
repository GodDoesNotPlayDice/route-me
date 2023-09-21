import { z } from 'zod'

export class DriverID {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
