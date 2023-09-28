import { z } from 'zod'
import { PreferenceIDSchema,
	PreferenceIconSchema, PreferenceNameSchema } from '.'

export const PreferenceSchema = z.object( {
	id: PreferenceIDSchema,
	name: PreferenceNameSchema,
	icon: PreferenceIconSchema
} )

export type Preference = z.infer<typeof PreferenceSchema>

export interface PreferenceProps {
	id: string
	name: string
	icon: string
}
export const newPreference = (props : PreferenceProps): Preference => {
	return PreferenceSchema.parse( {
		id: PreferenceIDSchema.parse({
			value: props.id
		}),
		name: PreferenceNameSchema.parse({
			value: props.name
			}),
		icon: PreferenceIconSchema.parse({
			value: props.icon
		})
	} )
}
