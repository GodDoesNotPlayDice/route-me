import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverDocumentReferenceInvalidException } from 'src/package/driver-document/domain/exceptions/driver-document-reference-invalid-exception'
import { z } from 'zod'

export const DriverDocumentReferenceSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type DriverDocumentReferenceType = z.infer<typeof DriverDocumentReferenceSchema>

export interface DriverDocumentReference extends DriverDocumentReferenceType {}

export interface DriverDocumentReferenceProps {
	value: string
}

/**
 * Create driver document reference instance
 * @throws {DriverDocumentReferenceInvalidException} - if document reference is invalid
 */
export const newDriverDocumentReference = ( props: DriverDocumentReferenceProps ): Result<DriverDocumentReference, Error> => {
	const result = DriverDocumentReferenceSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DriverDocumentReferenceInvalidException() )
	}
	else {
		return Ok( result.data )
	}

}
