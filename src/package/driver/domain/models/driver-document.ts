import {
  DriverDocumentID,
  DriverDocumentName,
  DriverDocumentReference,
  DriverID,
  newDriverDocumentID,
  newDriverDocumentName,
  newDriverDocumentReference,
  newDriverID
} from '.'

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
