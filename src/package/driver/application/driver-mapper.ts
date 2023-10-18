import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  driverDocumentFromJson,
  driverDocumentToJson
} from 'src/package/driver/application/driver-document-mapper'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverDocument } from 'src/package/driver/domain/models/driver-document'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from driver instance
 * @throws {UnknownException} - if unknown error
 */
export const driverToJson = ( driver: Driver ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id       : driver.id.value,
      documents: driver.documents.map( ( document ) => driverDocumentToJson(document) )
    }
    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error driver to json' )
    return Err( err )
  }
}

/**
 * Create a driver instance from json
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {DriverDocumentIdInvalidException} - if driver document id is invalid
 * @throws {DriverDocumentNameInvalidException} - if driver document name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if driver document reference is invalid
 */
export const driverFromJson = ( json: Record<string, any> ): Result<Driver, Error[]> => {
  const err: Error[] = []

  const driverID = newDriverID( {
    value: json['id'] ?? ''
  } )

  if ( driverID.isErr() ) {
    err.push( driverID.unwrapErr() )
  }

  const documents: DriverDocument[] = []

  if ( json['documents'] !== undefined ) {
    for ( const document of Object.values( json['documents'] ) ) {
      const driverDocument = driverDocumentFromJson( document as Record<string, any>)

      if ( driverDocument.isErr() ) {
        err.push( ...driverDocument.unwrapErr() )
      }
      else {
        documents.push( driverDocument.unwrap() )
      }
    }
  }

  if ( err.length > 0 ) {
    err.push( ...err )
    return Err( err )
  }

  return Ok( {
      id       : driverID.unwrap(),
      documents: documents
    }
  )
}
