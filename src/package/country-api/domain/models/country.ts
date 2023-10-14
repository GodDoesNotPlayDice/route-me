import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	CountryFlagUrl,
	CountryFlagUrlProps,
	newCountryFlagUrl
} from 'src/package/country-api/domain/models/country-flag-url'
import {
	CountryName,
	CountryNameProps,
	newCountryName
} from 'src/package/country-api/domain/models/country-name'
import {
	CountryNameCode,
	CountryNameCodeProps,
	newCountryNameCode
} from 'src/package/country-api/domain/models/country-name-code'
import {
	CountryNumberCode,
	CountryNumberCodeProps,
	newCountryNumberCode
} from 'src/package/country-api/domain/models/country-number-code'
import { newCountryRestCountries } from 'src/package/country-api/infrastructure/rest-countries/country'

export interface Country {
	flag: CountryFlagUrl
	name: CountryName
	code: CountryNameCode
	number: CountryNumberCode
}

export interface CountryProps {
	flag: CountryFlagUrlProps
	name: CountryNameProps
	code: CountryNameCodeProps
	number: CountryNumberCodeProps
}

export const newCountryFromJson = ( json: Record<string, any> ): Result<Country, Error[]> => {
  return newCountryRestCountries(json)
}

/**
 * Create country instance
 * @throws {CountryFlagInvalidException} - if flag is invalid
 * @throws {CountryNameInvalidException} - if name is invalid
 * @throws {CountryNameCodeInvalidException} - if name code is invalid
 * @throws {CountryNumberCodeInvalidException} - if number code is invalid
 */
export const newCountry = ( props: CountryProps ): Result<Country, Error[]> => {
	const errors: Error[] = []

	const flag            = newCountryFlagUrl( props.flag )

	if ( flag.isErr() ) {
		errors.push( flag.unwrapErr() )
	}

	const name = newCountryName( props.name )

	if ( name.isErr() ) {
		errors.push( name.unwrapErr() )
	}

	const code = newCountryNameCode( props.code )

	if ( code.isErr() ) {
		errors.push( code.unwrapErr() )
	}

	const number = newCountryNumberCode( props.number )

	if ( number.isErr() ) {
		errors.push( number.unwrapErr() )
	}

	if ( errors.length > 0 ) {
		return Err( errors )
	}

	return Ok({
			flag  : flag.unwrap(),
			name  : name.unwrap(),
			code  : code.unwrap(),
			number: number.unwrap()
		}
	)
}
