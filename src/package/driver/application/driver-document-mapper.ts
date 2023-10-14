import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  DriverDocument,
  newDriverDocument
} from 'src/package/driver/domain/models/driver-document'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from driver document instance
 * @throws {UnknownException} - if unknown error
 */
export const driverDocumentToJson = ( driverDocument: DriverDocument ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id       : driverDocument.id.value,
      driverID : driverDocument.driverID.value,
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
 * @throws {DriverDocumentIdInvalidException} - if id is invalid
 * @throws {DriverIdInvalidException} - if id is invalid
 * @throws {DriverDocumentNameInvalidException} - if name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if document reference is invalid
 */
export const driverDocumentFromJson = ( json: Record<string, any> ): Result<DriverDocument, Error[]> => {
  const result = newDriverDocument( {
    id       : json['id'],
    driverID : json['driverID'],
    name     : json['name'],
    reference: json['reference']
  } )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( result.unwrap() )
}
