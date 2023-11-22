import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PermissionStateInvalidException } from 'src/package/position-api/domain/exceptions/permission-state-invalid-exception'
import { z } from 'zod'

export enum PermissionState {
	Prompt  = 'Prompt',
	Granted = 'Granted',
	Denied  = 'Denied'
}

export const TripEnumSchema = z.nativeEnum( PermissionState )

// type PermissionStateEnumType = z.infer<typeof TripEnumSchema>
// export type PermissionState = PermissionStateEnumType

export interface PermissionStateProps {
	value: string
}

/**
 * Create permission state instance
 * @throws {PermissionStateInvalidException} - if permission state is invalid
 */
export const newPermissionState = ( props: PermissionStateProps ): Result<PermissionState, Error> => {
	const result = TripEnumSchema.safeParse( props.value )

	if ( !result.success ) {
		return Err( new PermissionStateInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
