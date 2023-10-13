import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
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

/**
 * Create driver document id instance
 * @throws {DriverDocumentIdInvalidException} - if id is invalid
 * @throws {DriverIdInvalidException} - if id is invalid
 * @throws {DriverDocumentNameInvalidException} - if name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if document reference is invalid
 */
export const newDriverDocument = ( props: DriverDocumentProps ): Result<DriverDocument, Error[]> => {

  const err: Error[] = []

  const documentID = newDriverDocumentID({
    value: props.id
  })

  if (documentID.isErr()) {
    err.push(documentID.unwrapErr())
  }

  const driverID = newDriverID({
    value: props.driverID
  })

  if (driverID.isErr()) {
    err.push(driverID.unwrapErr())
  }

  const documentName = newDriverDocumentName({
    value: props.name
  })

  if (documentName.isErr()) {
    err.push(documentName.unwrapErr())
  }

  const documentReference = newDriverDocumentReference({
    value: props.reference
  })

  if (documentReference.isErr()) {
    err.push(documentReference.unwrapErr())
  }

  if (err.length > 0) {
    return Err(err)
  }

  return Ok({
      id: documentID.unwrap(),
      driverID: driverID.unwrap(),
      name: documentName.unwrap(),
      reference: documentReference.unwrap()
    }
  )
}
