import { Flags } from 'src/package/country-api/infrastructure/rest-countries/country-flag-url'
import { Name } from 'src/package/country-api/infrastructure/rest-countries/country-name'
import { Idd } from 'src/package/country-api/infrastructure/rest-countries/country-number-code'

export interface CountryRestCountries {
  flags: Flags;
  name: Name;
  cca2: string;
  idd: Idd;
}
