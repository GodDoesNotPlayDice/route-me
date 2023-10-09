import { Direction } from 'src/package/direction-api/domain/models/direction'
import { newGeometry } from 'src/package/direction-api/domain/models/geometry'
import { Route } from 'src/package/direction-api/infrastructure/mapbox/models/route-map-box'
import { Waypoint } from 'src/package/direction-api/infrastructure/mapbox/models/way-point-map-box'

export interface DirectionMapBox {
	routes:    Route[];
	waypoints: Waypoint[];
	code:      string;
	uuid:      string;
}

export const newDirectionMapBox = ( json: Record<string, any> ): Direction => {
	return{
		coordinates: newGeometry({
			values: json[ 'routes' ][0][ 'geometry' ][ 'coordinates' ]
		})
	}
}
