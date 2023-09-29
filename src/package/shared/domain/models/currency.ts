import { z } from 'zod'

export const CurrencySchema = z.object( {
	value : z.string().nonempty().max( 3 )
} )

type CurrencyType = z.infer<typeof CurrencySchema>
export interface Currency extends CurrencyType{}

interface CurrencyProps {
	value : string
}

export const newCurrency = (props : CurrencyProps): Currency => {
	return CurrencySchema.parse( {
		value : props.value
	} )
}
