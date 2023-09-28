import { z } from 'zod'

export const MoneySchema = z.object( {
	value : z.number().nonnegative()
} )

export type Money = z.infer<typeof MoneySchema>

interface MoneyProps {
	value : number
}

export const newMoney = (props : MoneyProps): Money => {
	return MoneySchema.parse( {
		value : props.value
	} )
}
