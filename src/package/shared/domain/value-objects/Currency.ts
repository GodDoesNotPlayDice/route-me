import { z } from 'zod'

export class Currency {
	constructor( readonly value: string ) {
		z.string()
		 .nonempty()
		 .max(3)
		 .parse( value )
	}
}
