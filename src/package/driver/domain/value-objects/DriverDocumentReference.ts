import { z } from 'zod'

export class DriverDocumentReference {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
