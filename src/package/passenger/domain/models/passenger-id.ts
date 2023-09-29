import { z } from 'zod'

export const PassengerIDSchema = z.object( {
	value : z.string(),
} )

type PassengerIDType = z.infer<typeof PassengerIDSchema>
export interface PassengerID extends PassengerIDType {}

export interface PassengerIDProps {
	value : string
}

export const newPassengerID = (props : PassengerIDProps): PassengerID => {
	return PassengerIDSchema.parse( {
		value : props.value
	} )
}
