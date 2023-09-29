import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	Country,
	newCountry,
	newCountryFlagUrl,
	newCountryNameCode,
	newCountryName,
	newCountryNumberCode
} from 'src/app/shared/models/country/domain'

export const countryFromJson = ( json: Record<string, any> ): Option<Country> => {
	try {
		return Some(
			newCountry( {
				flag  : newCountryFlagUrl( {
					png: json['flag']['png']
				} ),
				code  : newCountryNameCode( {
					value: json['code']
				} ),
				name  : newCountryName( {
					common  : json['name']['common'],
					official: json['name']['official']
				} ),
				number: newCountryNumberCode( {
					root    : json['number']['root'],
					suffixes: json['number']['suffixes']
				} )
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
