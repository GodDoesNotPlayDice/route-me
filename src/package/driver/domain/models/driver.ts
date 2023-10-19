import { DriverDocument } from 'src/package/driver/domain/models/driver-document'
import { DriverID } from 'src/package/driver/domain/models/driver-id'

export interface Driver {
  id: DriverID
  documents: DriverDocument[]
}
