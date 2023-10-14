import { Position } from 'src/package/position-api/domain/models/position'
import { StreetName } from 'src/package/street-api/domain/models/street-name'
import { StreetPlace } from 'src/package/street-api/domain/models/street-place'

export interface Street {
  name: StreetName
  place: StreetPlace
  center: Position
}
