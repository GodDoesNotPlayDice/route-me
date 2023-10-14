import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import {
  DriverDocumentID,
  newDriverDocumentID
} from 'src/package/driver/domain/models/driver-document-id'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newUserID } from 'src/package/user/domain/models/user-id'

/**
 * Create a json from driver instance
 * @throws {UnknownException} - if unknown error
 */
export const driverToJson = ( driver: Driver ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id       : driver.id.value,
      userID   : driver.userID.value,
      documents: driver.documents.map( ( document ) => document.value )
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
 * @throws {UserIdInvalidException} - if user id is invalid
 */
export const driverFromJson = ( json: Record<string, any> ): Result<Driver, Error[]> => {
  const err: Error[] = []

  const driverID = newDriverID( {
    value: json['id'] ?? ''
  } )

  if ( driverID.isErr() ) {
    err.push( driverID.unwrapErr() )
  }

  const documents: DriverDocumentID[] = []

  if ( json['documents'] !== undefined ) {
    for ( const document of Object.values( json['documents'] ) ) {
      const driverDocumentID = newDriverDocumentID( {
        value: document as string
      } )

      if ( driverDocumentID.isErr() ) {
        err.push( driverDocumentID.unwrapErr() )
      }
      else {
        documents.push( driverDocumentID.unwrap() )
      }
    }
  }

  const userID = newUserID( {
    value: json['userID'] ?? ''
  } )

  if ( userID.isErr() ) {
    err.push( userID.unwrapErr() )
  }

  if ( err.length > 0 ) {
    err.push( ...err )
    return Err( err )
  }

  return Ok( {
      id       : driverID.unwrap(),
      userID   : userID.unwrap(),
      documents: documents
    }
  )
}
