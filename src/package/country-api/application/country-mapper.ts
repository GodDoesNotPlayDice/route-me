import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Country } from 'src/package/country-api/domain/models/country'
import { newCountryFlagUrl } from 'src/package/country-api/domain/models/country-flag-url'
import { newCountryName } from 'src/package/country-api/domain/models/country-name'
import { newCountryNameCode } from 'src/package/country-api/domain/models/country-name-code'
import { newCountryNumberCode } from 'src/package/country-api/domain/models/country-number-code'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a country instance from json
 * @throws {CountryFlagInvalidException} - if flag is invalid
 * @throws {CountryNameInvalidException} - if name is invalid
 * @throws {CountryNameCodeInvalidException} - if name code is invalid
 * @throws {CountryNumberCodeInvalidException} - if number code is invalid
 */
export const countryFromJson = ( json: Record<string, any> ): Result<Country, Error[]> => {
	const errors: Error[] = []

	const flag = newCountryFlagUrl( {
		png: json['flags']?.png ?? ''
	} )

	if ( flag.isErr() ) {
		errors.push( flag.unwrapErr() )
	}

	const name = newCountryName( {
		common  : json['name']?.common ?? '',
		official: json['name']?.official ?? ''
	} )

	if ( name.isErr() ) {
		errors.push( name.unwrapErr() )
	}

	const code = newCountryNameCode( {
		value: json['cca2'] ?? ''
	} )

	if ( code.isErr() ) {
		errors.push( code.unwrapErr() )
	}

	const number = newCountryNumberCode( {
		root    : json['idd']?.root ?? '',
		suffixes: json['idd']?.suffixes ?? ''
	} )

	if ( number.isErr() ) {
		errors.push( number.unwrapErr() )
	}

	if ( errors.length > 0 ) {
		return Err( errors )
	}

	return Ok( {
			flag  : flag.unwrap(),
			name  : name.unwrap(),
			code  : code.unwrap(),
			number: number.unwrap()
		}
	)
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
