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
  DriverID,
  newDriverID
} from 'src/package/driver/domain/models/driver-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Driver {
  id: DriverID
  userID: UserID
  documents: DriverDocumentID[]
}

export interface DriverProps {
  id: string
  userID: UserID
  documents: string[]
}

/**
 * Create driver  instance
 * @throws {DriverIdInvalidException} - if id is invalid
 * @throws {DriverDocumentIdInvalidException} - if id is invalid
 */
export const newDriver = ( props: DriverProps ): Result<Driver, Error[]> => {
  const err: Error[] = []
  const driverID     = newDriverID( {
    value: props.id
  } )

  if ( driverID.isErr() ) {
    err.push( driverID.unwrapErr() )
  }

  const documents: DriverDocumentID[] = []

  for ( const document of props.documents ) {
    const driverDocumentID = newDriverDocumentID( {
      value: document
    } )

    if ( driverDocumentID.isErr() ) {
      err.push( driverDocumentID.unwrapErr() )
    }
    else {
      documents.push( driverDocumentID.unwrap() )
    }
  }

  if ( err.length > 0 ) {
    err.push( ...err )
    return Err( err)
  }

  return Ok( {
      id       : driverID.unwrap(),
      userID   : props.userID,
      documents: documents
    }
  )
}
