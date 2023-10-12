import { z } from 'zod'

export const LocationNameSchema = z.object( {
	value: z.string()
} )

type LocationNameType = z.infer<typeof LocationNameSchema>

export interface LocationName extends LocationNameType {}

export interface LocationNameProps {
	value: string
}

export const newLocationName = ( props: LocationNameProps ): LocationName => {
	return LocationNameSchema.parse( {
		value: props.value
	} )
}
