import { Flags } from 'src/package/country-api/infrastructure/rest-countries/models/country-flag-url'
import { Name } from 'src/package/country-api/infrastructure/rest-countries/models/country-name'
import { Idd } from 'src/package/country-api/infrastructure/rest-countries/models/country-number-code'

export interface CountryRestCountries {
	flags: Flags;
	name: Name;
	cca2: string;
	idd: Idd;
}
