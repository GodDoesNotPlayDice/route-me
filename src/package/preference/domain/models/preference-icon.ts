import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PreferenceIconInvalidException } from 'src/package/preference/domain/exceptions/preference-icon-invalid-exception'
import { z } from 'zod'

export const PreferenceIconSchema = z.object( {
	value: z.string().min(1)
} )

type PreferenceIconType = z.infer<typeof PreferenceIconSchema>

export interface PreferenceIcon extends PreferenceIconType {}

export interface PreferenceIconProps {
	value: string
}

/**
 * Create a preference icon instance
 * @throws {PreferenceIconInvalidException} - if icon is invalid
 */
export const newPreferenceIcon = ( props: PreferenceIconProps ): Result<PreferenceIcon, Error> => {
	const result = PreferenceIconSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new PreferenceIconInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
