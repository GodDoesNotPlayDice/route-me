import { Result } from 'oxide.ts'
import {
  Country,
  newCountry
} from 'src/package/country-api/domain/models/country'
import { Flags } from 'src/package/country-api/infrastructure/rest-countries/country-flag-url'
import { Name } from 'src/package/country-api/infrastructure/rest-countries/country-name'
import { Idd } from 'src/package/country-api/infrastructure/rest-countries/country-number-code'

export interface CountryRestCountries {
  flags: Flags;
  name: Name;
  cca2: string;
  idd: Idd;
}

export const newCountryRestCountries = ( json: Record<string, any> ): Result<Country, Error[]> => {
  return newCountry( {
    flag  : {
      png: json['flags']['png']
    },
    name  : {
      common  : json['name']['common'],
      official: json['name']['official']
    },
    code  : {
      value: json['cca2']
    },
    number: {
      root    : json['idd']['root'],
      suffixes: json['idd']['suffixes']
    }
  } )
}
