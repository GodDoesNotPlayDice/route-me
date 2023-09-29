import {
	Country,
	newCountryFlagUrl,
	newCountryName,
	newCountryNameCode,
	newCountryNumberCode
} from 'src/app/shared/models/country/domain'
import {
	Flags,
	Idd,
	Name
} from 'src/app/shared/models/country/infrastructure/rest-countries'

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
