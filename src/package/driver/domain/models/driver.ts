import { DriverDocumentID } from 'src/package/driver/domain/models/driver-document-id'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Driver {
  id: DriverID
  userID: UserID
  documents: DriverDocumentID[]
}
