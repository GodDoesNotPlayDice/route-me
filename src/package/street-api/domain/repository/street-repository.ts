import { Result } from 'oxide.ts'
import { Position } from 'src/package/location-api/domain/models/position'
import { Street } from 'src/package/street-api/domain/models/street'

export abstract class StreetRepository {
  abstract getStreet( searchTerm: string, center: Position ) : Promise<Result<Street, string>>
}
