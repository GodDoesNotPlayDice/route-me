import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { MoneyInvalidException } from 'src/package/shared/domain/exceptions/money-invalid-exception'
import { z } from 'zod'

export const MoneySchema = z.object( {
	value: z.number()
	        .nonnegative()
} )

type MoneyType = z.infer<typeof MoneySchema>

export interface Money extends MoneyType {}

interface MoneyProps {
	value: number
}

/**
 * Create a money instance
 * @throws {MoneyInvalidException} - if money is invalid
 */
export const newMoney = ( props: MoneyProps ): Result<Money, Error> => {
	const result = MoneySchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new MoneyInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
