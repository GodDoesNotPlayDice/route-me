import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PreferenceNameInvalidException } from 'src/package/preference/domain/exceptions/preference-name-invalid-exception'
import { z } from 'zod'

export const PreferenceNameSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type PreferenceNameType = z.infer<typeof PreferenceNameSchema>

export interface PreferenceName extends PreferenceNameType {}

export interface PreferenceNameProps {
	value: string
}

/**
 * Create a preference name instance
 * @throws {PreferenceNameInvalidException} - if name is invalid
 */
export const newPreferenceName = ( props: PreferenceNameProps ): Result<PreferenceName, Error> => {
	const result = PreferenceNameSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new PreferenceNameInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
