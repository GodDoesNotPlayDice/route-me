import { z } from 'zod'

export class TripSeat {
  constructor( readonly value: number ) {
    z.number()
     .nonnegative()
     .parse( value )
  }
}
