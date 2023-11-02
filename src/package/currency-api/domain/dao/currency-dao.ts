import { Result } from 'oxide.ts'
import { CurrencyExchange } from 'src/package/currency-api/domain/models/currency-exchange'

export abstract class CurrencyDao {
	abstract getCurrencyExchange( from: string, to: string): Promise<Result<CurrencyExchange, Error>>
}
