import {
	DriverDocumentIDSchema,
	DriverDocumentNameSchema,
	DriverDocumentReferenceSchema,
	DriverIDSchema
} from 'src/package/driver/domain/models'
import { z } from 'zod'

export const DriverDocumentSchema = z.object( {
	id       : DriverDocumentIDSchema,
	driverID : DriverIDSchema,
	name     : DriverDocumentNameSchema,
	reference: DriverDocumentReferenceSchema
} )

export type DriverDocument = z.infer<typeof DriverDocumentSchema>

export interface DriverDocumentProps {
	id: string
	driverID: string
	name: string
	reference: string
}

export const newDriverDocument = ( props: DriverDocumentProps ): DriverDocument => {
	return DriverDocumentSchema.parse( {
		id       : DriverDocumentIDSchema.parse( {
			value: props.id
		} ),
		driverID : DriverIDSchema.parse( {
			value: props.driverID
		} ),
		name     : DriverDocumentNameSchema.parse( {
			value: props.name
		} ),
		reference: DriverDocumentReferenceSchema.parse( {
			value: props.reference
		} )
	} )
}
