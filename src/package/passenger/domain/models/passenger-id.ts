import { z } from 'zod'

export const PassengerIDSchema = z.object( {
	value : z.string(),
} )

export type PassengerID = z.infer<typeof PassengerIDSchema>

interface PassengerIDProps {
	value : string
}

export const newPassengerID = (props : PassengerIDProps): PassengerID => {
	return PassengerIDSchema.parse( {
		value : props.value
	} )
}
