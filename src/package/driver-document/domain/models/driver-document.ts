import { DriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'
import { DriverDocumentName } from 'src/package/driver-document/domain/models/driver-document-name'
import { DriverDocumentReference } from 'src/package/driver-document/domain/models/driver-document-reference'

export interface DriverDocument {
	id: DriverDocumentID
	name: DriverDocumentName
	reference: DriverDocumentReference
}

export interface DriverDocumentProps {
	id: string
	name: string
	reference: string
}
