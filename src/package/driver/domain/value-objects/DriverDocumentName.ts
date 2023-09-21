import { z } from 'zod'

export class DriverDocumentName {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
