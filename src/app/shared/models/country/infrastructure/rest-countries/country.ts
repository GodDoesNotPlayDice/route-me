import { Country } from 'src/app/shared/models/country/domain/country'
import { newCountryFlagUrl } from 'src/app/shared/models/country/domain/country-flag-url'
import { newCountryName } from 'src/app/shared/models/country/domain/country-name'
import { newCountryNameCode } from 'src/app/shared/models/country/domain/country-name-code'
import { newCountryNumberCode } from 'src/app/shared/models/country/domain/country-number-code'
import { Flags } from 'src/app/shared/models/country/infrastructure/rest-countries/country-flag-url'
import { Name } from 'src/app/shared/models/country/infrastructure/rest-countries/country-name'
import { Idd } from 'src/app/shared/models/country/infrastructure/rest-countries/country-number-code'

export interface CountryRestCountries {
	flags: Flags;
	name: Name;
	cca2: string;
	idd: Idd;
}

export const newCountryRestCountries = ( props: CountryRestCountries ): Country => {
	return{
		flag  : newCountryFlagUrl( {
			png: props.flags.png
		} ),
		name  : newCountryName( {
			common  : props.name.common,
			official: props.name.official
		} ),
		code  : newCountryNameCode( {
			value: props.cca2
		} ),
		number: newCountryNumberCode( {
			root    : props.idd.root,
			suffixes: props.idd.suffixes
		} )
	}
}
