import { Country } from 'src/package/country-api/domain/country'
import { newCountryFlagUrl } from 'src/package/country-api/domain/country-flag-url'
import { newCountryName } from 'src/package/country-api/domain/country-name'
import { newCountryNameCode } from 'src/package/country-api/domain/country-name-code'
import { newCountryNumberCode } from 'src/package/country-api/domain/country-number-code'
import { Flags } from 'src/package/country-api/infrastructure/rest-countries/country-flag-url'
import { Name } from 'src/package/country-api/infrastructure/rest-countries/country-name'
import { Idd } from 'src/package/country-api/infrastructure/rest-countries/country-number-code'

export interface CountryRestCountries {
	flags: Flags;
	name: Name;
	cca2: string;
	idd: Idd;
}

export const newCountryRestCountries = ( json: Record<string, any> ): Country => {
	return {
		flag  : newCountryFlagUrl( {
			png: json[ 'flags' ][ 'png' ]
		} ),
		name  : newCountryName( {
			common  : json[ 'name' ][ 'common' ],
			official: json[ 'name' ][ 'official' ]
		} ),
		code  : newCountryNameCode( {
			value: json[ 'cca2' ]
		} ),
		number: newCountryNumberCode( {
			root    : json[ 'idd' ][ 'root' ],
			suffixes: json[ 'idd' ][ 'suffixes' ]
		} )
	}
}
