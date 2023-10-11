import {
  Direction,
  newDirection
} from 'src/package/direction-api/domain/models/direction'
import { Route } from 'src/package/direction-api/infrastructure/mapbox/models/route-map-box'
import { Waypoint } from 'src/package/direction-api/infrastructure/mapbox/models/way-point-map-box'

export interface DirectionMapBox {
	routes:    Route[];
	waypoints: Waypoint[];
	code:      string;
	uuid:      string;
}

export const newDirectionMapBox = ( json: Record<string, any> ): Direction => {
	return newDirection({
    coordinates: {
      values: json[ 'routes' ][0][ 'geometry' ][ 'coordinates' ]
    }
  })
}
