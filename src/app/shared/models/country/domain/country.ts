import {
	CountryFlagUrl,
	CountryFlagUrlProps,
	CountryName,
	CountryNameCode,
	CountryNameCodeProps,
	CountryNameProps,
	CountryNumberCode,
	CountryNumberCodeProps,
	newCountryFlagUrl,
	newCountryName,
	newCountryNameCode,
	newCountryNumberCode
} from '.'

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

export const newCountry = ( props: CountryProps ): Country => {
	return{
		flag  : newCountryFlagUrl( props.flag ),
		name  : newCountryName( props.name ),
		code  : newCountryNameCode( props.code ),
		number: newCountryNumberCode( props.number )
	}
}
