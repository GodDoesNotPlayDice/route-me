import { Result } from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { StreetsData } from 'src/package/street-api/domain/models/streets-data'

export abstract class StreetRepository {
	abstract getStreetsByTerm( searchTerm: string,
		center: Position ): Promise<Result<StreetsData, Error[]>>

	abstract getStreetsByPosition( center: Position ): Promise<Result<StreetsData, Error[]>>
}
