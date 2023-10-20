import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { newDriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'
import { newDriverDocumentName } from 'src/package/driver-document/domain/models/driver-document-name'
import { newDriverDocumentReference } from 'src/package/driver-document/domain/models/driver-document-reference'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from driver document instance
 * @throws {UnknownException} - if unknown error
 */
export const driverDocumentToJson = ( driverDocument: DriverDocument ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id       : driverDocument.id.value,
      name     : driverDocument.name.value,
      reference: driverDocument.reference.value
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error driver document to json' )
    return Err( err )
  }
}

/**
 * Create a driver document instance from json
 * @throws {DriverDocumentIdInvalidException} - if driver document id is invalid
 * @throws {DriverDocumentNameInvalidException} - if driver document name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if driver document reference is invalid
 */
export const driverDocumentFromJson = ( json: Record<string, any> ): Result<DriverDocument, Error[]> => {
  const err: Error[] = []

  const documentID = newDriverDocumentID( {
    value: json['id'] ?? ''
  } )

  if ( documentID.isErr() ) {
    err.push( documentID.unwrapErr() )
  }

  const documentName = newDriverDocumentName( {
    value: json['name'] ?? ''
  } )

  if ( documentName.isErr() ) {
    err.push( documentName.unwrapErr() )
  }

  const documentReference = newDriverDocumentReference( {
    value: json['reference'] ?? ''
  } )

  if ( documentReference.isErr() ) {
    err.push( documentReference.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id       : documentID.unwrap(),
      name     : documentName.unwrap(),
      reference: documentReference.unwrap()
    }
  )
}
