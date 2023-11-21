import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PreferenceSourceInvalidException } from 'src/package/preference/domain/exceptions/preference-source-invalid-exception'
import { z } from 'zod'

export const PreferenceSourceSchema = z.object( {
	value: z.string()
	        .min( 3 )
} )

type PreferenceSourceType = z.infer<typeof PreferenceSourceSchema>

export interface PreferenceSource extends PreferenceSourceType {}

export interface PreferenceSourceProps {
	value: string
}

/**
 * Create a preference source instance
 * @throws {PreferenceSourceInvalidException} - if source is invalid
 */
export const newPreferenceSource = ( props: PreferenceSourceProps ): Result<PreferenceSource, Error> => {
	const result = PreferenceSourceSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new PreferenceSourceInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
