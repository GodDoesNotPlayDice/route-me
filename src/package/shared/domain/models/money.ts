import { z } from 'zod'

export const MoneySchema = z.object( {
	value : z.number().nonnegative()
} )

type MoneyType = z.infer<typeof MoneySchema>
export interface Money extends MoneyType{}

interface MoneyProps {
	value : number
}

export const newMoney = (props : MoneyProps): Money => {
	return MoneySchema.parse( {
		value : props.value
	} )
}
