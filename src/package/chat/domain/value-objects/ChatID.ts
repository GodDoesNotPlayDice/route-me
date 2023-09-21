import { z } from 'zod'

export class ChatID {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
