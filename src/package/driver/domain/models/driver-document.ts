import {
  DriverDocumentID,
  newDriverDocumentID
} from 'src/package/driver/domain/models/driver-document-id'
import {
  DriverDocumentName,
  newDriverDocumentName
} from 'src/package/driver/domain/models/driver-document-name'
import {
  DriverDocumentReference,
  newDriverDocumentReference
} from 'src/package/driver/domain/models/driver-document-reference'
import {
  DriverID,
  newDriverID
} from 'src/package/driver/domain/models/driver-id'

export interface DriverDocument {
  id: DriverDocumentID
  driverID: DriverID
  name: DriverDocumentName
  reference: DriverDocumentReference
}

export interface DriverDocumentProps {
  id: string
  driverID: string
  name: string
  reference: string
}

export const newDriverDocument = ( props: DriverDocumentProps ): DriverDocument => {
  return {
    id: newDriverDocumentID({
      value: props.id
    }),
    driverID: newDriverID({
      value: props.driverID
    }),
    name: newDriverDocumentName({
      value: props.name
    }),
    reference: newDriverDocumentReference({
      value: props.reference
    })
  }
}
