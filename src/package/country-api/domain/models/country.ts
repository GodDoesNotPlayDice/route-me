import { CountryFlagUrl } from 'src/package/country-api/domain/models/country-flag-url'
import { CountryName } from 'src/package/country-api/domain/models/country-name'
import { CountryNameCode } from 'src/package/country-api/domain/models/country-name-code'
import { CountryNumberCode } from 'src/package/country-api/domain/models/country-number-code'

export interface Country {
	flag: CountryFlagUrl
	name: CountryName
	code: CountryNameCode
	number: CountryNumberCode
}
