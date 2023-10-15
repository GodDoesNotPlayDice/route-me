import { Result } from 'oxide.ts'
import { Country } from 'src/package/country-api/domain/models/country'
import { CountryNameCode } from 'src/package/country-api/domain/models/country-name-code'

export abstract class CountryDao {
  abstract getAll(): Promise<Result<Country[], Error[]>>
}
