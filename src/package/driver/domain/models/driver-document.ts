import { DriverDocumentID } from 'src/package/driver/domain/models/driver-document-id'
import { DriverDocumentName } from 'src/package/driver/domain/models/driver-document-name'
import { DriverDocumentReference } from 'src/package/driver/domain/models/driver-document-reference'
import { DriverID } from 'src/package/driver/domain/models/driver-id'

export interface DriverDocument {
  id: DriverDocumentID
  driverID: DriverID
  name: DriverDocumentName
  reference: DriverDocumentReference
}
