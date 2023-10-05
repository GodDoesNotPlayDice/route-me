import { z } from 'zod'

export const LocationSchema = z.object( {
	value : z.string()
} )

type LocationType = z.infer<typeof LocationSchema>
export interface Location extends LocationType{}

export interface LocationProps {
	value : string
}

export const newLocation = (props : LocationProps): Location => {
	return LocationSchema.parse( {
		value : props.value
	} )
}
