import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	Country,
} from 'src/app/shared/models/country/domain'
import { newCountry } from 'src/app/shared/models/country/infrastructure'

export const countryFromJson = ( json: Record<string, any> ): Option<Country> => {
	try {
		return Some(
			newCountry( {
				name: json[ 'name' ],
				flags: json[ 'flags' ],
				cca2: json[ 'code' ],
				idd: json[ 'number' ]
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
