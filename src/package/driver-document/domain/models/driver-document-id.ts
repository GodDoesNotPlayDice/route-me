import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverDocumentIdInvalidException } from 'src/package/driver-document/domain/exceptions/driver-document-id-invalid-exception'
import { z } from 'zod'

export const DriverDocumentIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type DriverDocumentIDType = z.infer<typeof DriverDocumentIDSchema>

export interface DriverDocumentID extends DriverDocumentIDType {}

export interface DriverDocumentIDProps {
	value: string
}

/**
 * Create driver document id instance
 * @throws {DriverDocumentIdInvalidException} - if id is invalid
 */
export const newDriverDocumentID = ( props: DriverDocumentIDProps ): Result<DriverDocumentID, Error> => {
	const result = DriverDocumentIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DriverDocumentIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
