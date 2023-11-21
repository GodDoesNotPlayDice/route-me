import { Result } from 'oxide.ts'
import { Country } from 'src/package/country-api/domain/models/country'

export abstract class CountryDao {
	abstract getAll(): Promise<Result<Country[], Error[]>>
}
