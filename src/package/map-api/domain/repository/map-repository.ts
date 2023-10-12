import { Geometry } from 'src/package/direction-api/domain/models/geometry'
import { Position } from 'src/package/position-api/domain/models/position'

export abstract class MapRepository<Mp, Mr> {
	abstract addRouteMarker( pageKey: string, locationKey: string, center: Position, color : string ): Promise<void>
	abstract removeRouteMarker( pageKey: string, locationKey: string ): Promise<void>

	abstract init( key: string, divElement: HTMLDivElement, center: Position | null ): Promise<Mp>

	abstract autoFollow( center: Position ): Promise<void>

	abstract addUserMarker( pageKey: string, center: Position, map : Mp ): Promise<void>

	abstract addRouteMap( pageKey: string, coordinates : Geometry ): Promise<void>
	abstract removeRouteMap( pageKey: string ): Promise<void>

	maps: Map<string, Mp>                      = new Map()
	userMarkers: Map<string, Mr | undefined>   = new Map()
	routeMarkers: Map<string, Map<string, Mr>> = new Map()
}
