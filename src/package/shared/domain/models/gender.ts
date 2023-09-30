import { z } from 'zod'

export enum GenderEnum {
	Male   = 'Male',
	Female = 'Female',
	None   = 'None'
}

export const GenderEnumSchema = z.nativeEnum( GenderEnum )

export type Gender = z.infer<typeof GenderEnumSchema>

interface GenderProps {
	value: string
}

export const newGender = ( props: GenderProps ): Gender => {
	return GenderEnumSchema.parse( props.value )
}

