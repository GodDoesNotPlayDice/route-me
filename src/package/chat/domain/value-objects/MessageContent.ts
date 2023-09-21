import { z } from 'zod'

export class MessageContent {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
