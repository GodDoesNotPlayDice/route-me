import { Geometry } from 'src/package/direction-api/domain/models/geometry'
import { ValidNumber } from 'src/package/shared/domain/models/valid-number'

export interface Direction {
	coordinates: Geometry
	distance: ValidNumber
}
