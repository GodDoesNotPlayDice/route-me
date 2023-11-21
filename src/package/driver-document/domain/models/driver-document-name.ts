import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverDocumentNameInvalidException } from 'src/package/driver-document/domain/exceptions/driver-document-name-invalid-exception'
import { z } from 'zod'

export const DriverDocumentNameSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

// export enum DriverDocumentNameEnum {
// 	Licencia     = 'Licencia',
// 	Registro     = 'Registro',
// 	Antecedentes = 'Antecedentes',
// 	Historial    = 'Historial',
// }
// export const DriverDocumentNameEnumSchema = z.nativeEnum(
// 	DriverDocumentNameEnum )

type DriverDocumentNameType = z.infer<typeof DriverDocumentNameSchema>

export interface DriverDocumentName extends DriverDocumentNameType {}

export interface DriverDocumentNameProps {
	value: string
}

/**
 * Create driver document name instance
 * @throws {DriverDocumentNameInvalidException} - if name is invalid
 */
export const newDriverDocumentName = ( props: DriverDocumentNameProps ): Result<DriverDocumentName, Error> => {
	const result = DriverDocumentNameSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DriverDocumentNameInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
