import { z } from 'zod'

export class PreferenceIcon {
  constructor( readonly value: string ) {
    z.string()
     .parse( value )
  }
}
