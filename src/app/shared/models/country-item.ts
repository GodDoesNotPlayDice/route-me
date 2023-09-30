import { Country } from 'src/app/shared/models/country/domain/country'

export interface CountryItem extends Country {
	selected: boolean
}

export interface CountryItemProps extends Country {
	selected: boolean
}

export const newCountryItem = ( props: CountryItemProps ): CountryItem => {
	return {
		...props
	}
}
