import { z } from 'zod'

export class Money {
	constructor( readonly value: number ) {
		z.number()
		 .nonnegative()
		 .parse( value )
	}
}
