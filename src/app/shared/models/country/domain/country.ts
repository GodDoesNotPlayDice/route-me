import {
	CountryFlagUrl,
	CountryFlagUrlProps,
	newCountryFlagUrl
} from 'src/app/shared/models/country/domain/country-flag-url'
import {
	CountryName,
	CountryNameProps,
	newCountryName
} from 'src/app/shared/models/country/domain/country-name'
import {
	CountryNameCode,
	CountryNameCodeProps,
	newCountryNameCode
} from 'src/app/shared/models/country/domain/country-name-code'
import {
	CountryNumberCode,
	CountryNumberCodeProps,
	newCountryNumberCode
} from 'src/app/shared/models/country/domain/country-number-code'
import { newCountryRestCountries } from 'src/app/shared/models/country/infrastructure/rest-countries/country'

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

export const newCountryFromJson = ( json: Record<string, any> ): Country => {
  return newCountryRestCountries(json)
}

export const newCountry = ( props: CountryProps ): Country => {
	return{
		flag  : newCountryFlagUrl( props.flag ),
		name  : newCountryName( props.name ),
		code  : newCountryNameCode( props.code ),
		number: newCountryNumberCode( props.number )
	}
}
