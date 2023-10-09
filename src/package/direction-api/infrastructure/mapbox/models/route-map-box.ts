import { Geometry } from 'src/package/direction-api/infrastructure/mapbox/models/geometry-map-box'

export interface Route {
	weight_name: string;
	weight:      number;
	duration:    number;
	distance:    number;
	legs:        Leg[];
	geometry:    Geometry;
}
