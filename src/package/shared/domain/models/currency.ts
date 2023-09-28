import { z } from 'zod'

export const CurrencySchema = z.object( {
	value : z.string().nonempty().max( 3 )
} )

export type Currency = z.infer<typeof CurrencySchema>

interface CurrencyProps {
	value : string
}

export const newCurrency = (props : CurrencyProps): Currency => {
	return CurrencySchema.parse( {
		value : props.value
	} )
}
