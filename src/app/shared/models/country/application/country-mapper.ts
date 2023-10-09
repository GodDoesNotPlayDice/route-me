import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
  Country,
  newCountryFromJson
} from 'src/app/shared/models/country/domain/country'

export const countryFromJson = ( json: Record<string, any> ): Option<Country> => {
	try {
		return Some(
			newCountryFromJson( json )
		)
	}
	catch ( e ) {
		console.log( 'error country from json' )
		console.log( e )
		return None
	}
}

export const countryToJson = ( country: Country ): Record<string, any> => {
	return {
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
}
