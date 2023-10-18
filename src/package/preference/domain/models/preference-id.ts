import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PreferenceIdInvalidException } from 'src/package/preference/domain/exceptions/preference-id-invalid-exception'
import { z } from 'zod'

export const PreferenceIDSchema = z.object( {
  value: z.string().min(1)
} )

type PreferenceIDType = z.infer<typeof PreferenceIDSchema>

export interface PreferenceID extends PreferenceIDType {}

export interface PreferenceIDProps {
  value: string
}

/**
 * Create a preference id instance
 * @throws {PreferenceIdInvalidException} - if id is invalid
 */
export const newPreferenceID = ( props: PreferenceIDProps ): Result<PreferenceID, Error> => {
  const result = PreferenceIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PreferenceIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
