import { Route } from 'src/package/direction-api/infrastructure/mapbox/models/route-map-box'
import { Waypoint } from 'src/package/direction-api/infrastructure/mapbox/models/way-point-map-box'

export interface DirectionMapBox {
	routes: Route[];
	waypoints: Waypoint[];
	code: string;
	uuid: string;
}
