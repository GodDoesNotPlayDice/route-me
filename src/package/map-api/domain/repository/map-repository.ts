import { Result } from 'oxide.ts'
import { Geometry } from 'src/package/direction-api/domain/models/geometry'
import { Position } from 'src/package/position-api/domain/models/position'

export abstract class MapRepository<Mp, Mr> {
	abstract addRouteMarker( pageKey: string, locationKey: string,
		center: Position, color: string, html ?: string,
		openFunction ?: ( toggleMarker: () => void ) => void
	): Promise<Result<boolean, Error>>

	abstract removeRouteMarker( pageKey: string, locationKey: string ): Promise<Result<boolean, Error>>
	abstract removeAllMarkersInMap( pageKey: string ): Promise<Result<boolean, Error>>

	abstract init( key: string, divElement: HTMLDivElement,
		center: Position | null ): Promise<Result<Mp, Error>>

	abstract removeMap( key: string ): Promise<Result<boolean, Error>>

	abstract autoFollow( key: string,
		center: Position ): Promise<Result<boolean, Error>>

	abstract addUserMarker( pageKey: string, center: Position,
		color: string, html ?: string ): Promise<Result<boolean, Error>>

	abstract addRouteMap( pageKey: string,
		coordinates: Geometry ): Promise<Result<boolean, Error>>

	abstract removeRouteMap( pageKey: string ): Promise<Result<boolean, Error>>

	maps: Map<string, Mp>                      = new Map()
	userMarkers: Map<string, Mr | undefined>   = new Map()
	routeMarkers: Map<string, Map<string, Mr>> = new Map()
}
