import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  driverCarFromJson,
  driverCarToJson
} from 'src/package/driver-car/application/driver-car-mapper'
import {
  driverDocumentFromJson,
  driverDocumentToJson
} from 'src/package/driver-document/application/driver-document-mapper'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { Driver } from 'src/package/driver/domain/models/driver'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import {
  passengerFromJson,
  passengerToJson
} from 'src/package/passenger/application/passenger-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from driver instance
 * @throws {UnknownException} - if unknown error
 */
export const driverToJson = ( driver: Driver ): Result<Record<string, any>, Error[]> => {
  try {
    const json: Record<string, any> = {
      id: driver.id.value
    }

    const err: Error[] = []

    const documents: Record<string, any>[] = []

    for ( const document of driver.documents ) {
      const documentResult = driverDocumentToJson( document )

      if ( documentResult.isErr() ) {
        err.push( documentResult.unwrapErr() )
      }
      else {
        documents.push( documentResult.unwrap() )
      }
    }

    if ( documents.length > 0 ) {
      json['documents'] = documents
    }
    else {
      json['documents'] = null
    }

    const passenger = passengerToJson( driver.passenger )

    if ( passenger.isErr() ) {
      err.push( ...passenger.unwrapErr() )
    }
    else {
      json['passenger'] = passenger.unwrap()
    }

    const car = driverCarToJson( driver.car )

    if ( car.isErr() ) {
      err.push( car.unwrapErr() )
    }
    else {
      json['car'] = car.unwrap()
    }

    if ( err.length > 0 ) {
      return Err( err )
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error driver to json' )
    return Err( [ err ] )
  }
}

/**
 * Create a driver instance from json
 * @throws {DriverIdInvalidException} - if driver id is invalid
 * @throws {DriverDocumentIdInvalidException} - if driver document id is invalid
 * @throws {DriverDocumentNameInvalidException} - if driver document name is invalid
 * @throws {DriverDocumentReferenceInvalidException} - if driver document reference is invalid
 * @throws {DriverCarIDInvalidException} - if id is invalid
 * @throws {DriverCarModelInvalidException} - if model is invalid
 * @throws {DriverCarSeatInvalidException} - if seat is invalid
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PassengerIdInvalidException} - if id is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if phone length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if phone length exceeds maximum
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 * @throws {PassengerCountryInvalidException} - if country is invalid
 * @throws {PreferenceIdInvalidException} - if preference id is invalid
 * @throws {GenderInvalidException} - if gender is invalid
 * @throws {ImageUrlInvalidException} - if image is invalid
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

  if ( json['documents'] !== null ) {
    for ( const document of Object.values( json['documents'] ) ) {
      const driverDocument = driverDocumentFromJson(
        document as Record<string, any> )

      if ( driverDocument.isErr() ) {
        err.push( ...driverDocument.unwrapErr() )
      }
      else {
        documents.push( driverDocument.unwrap() )
      }
    }
  }

  const car = driverCarFromJson( json['car'] )

  if ( car.isErr() ) {
    err.push( ...car.unwrapErr() )
  }

  const passenger = passengerFromJson( json['passenger'] )

  if ( passenger.isErr() ) {
    err.push( ...passenger.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id       : driverID.unwrap(),
      car      : car.unwrap(),
      passenger: passenger.unwrap(),
      documents: documents
    }
  )
}
