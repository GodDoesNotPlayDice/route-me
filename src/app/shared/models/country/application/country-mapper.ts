import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	Country,
	newCountryFlagUrl,
	newCountryNameCode,
	newCountryName,
	newCountryNumberCode
} from 'src/app/shared/models/country/domain'
import { newCountry } from 'src/app/shared/models/country/infrastructure'

export const countryFromJson = ( json: Record<string, any> ): Option<Country> => {
	try {
		return Some(
			newCountry( {
				name: json
			} )
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
