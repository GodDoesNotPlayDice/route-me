import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  Country,
  newCountryFromJson
} from 'src/package/country-api/domain/models/country'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a country instance from json
 * @throws {CountryFlagInvalidException} - if flag is invalid
 * @throws {CountryNameInvalidException} - if name is invalid
 * @throws {CountryNameCodeInvalidException} - if name code is invalid
 * @throws {CountryNumberCodeInvalidException} - if number code is invalid
 */
export const countryFromJson = ( json: Record<string, any> ): Result<Country, Error[]> => {
  return newCountryFromJson( json )
}

/**
 * Create a json from country instance
 * @throws {UnknownException} - if unknown error
 */
export const countryToJson = ( country: Country ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      flag  : {
        png: country.flag.png
      },
      name  : {
        common  : country.name.common,
        official: country.name.official
      },
      code  : country.code.value,
      number: {
        root    : country.number.root,
        suffixes: country.number.suffixes
      }
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error category to json' )
    return Err( err )
  }
}
