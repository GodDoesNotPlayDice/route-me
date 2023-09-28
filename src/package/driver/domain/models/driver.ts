import {
	DriverDocumentID,
	DriverDocumentIDSchema,
	DriverIDSchema
} from 'src/package/driver/domain/models'
import { UserIDSchema } from 'src/package/user'
import { z } from 'zod'

export const DriverSchema = z.object( {
	id     : DriverIDSchema,
	userID: UserIDSchema,
	documents: z.array( DriverDocumentIDSchema )
} )

export type Driver = z.infer<typeof DriverSchema>

export interface DriverProps {
	id: string
	userID: string
	documents: DriverDocumentID[]
}

export const newDriver = ( props: DriverProps ): Driver => {
	return DriverSchema.parse( {
		id     : DriverIDSchema.parse( {
			value: props.id
		} ),
		userID: UserIDSchema.parse( {
			value: props.userID
		} ),
		documents: props.documents
	} )
}
