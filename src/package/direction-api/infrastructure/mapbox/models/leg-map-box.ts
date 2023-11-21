import { Admin } from 'src/package/direction-api/infrastructure/mapbox/models/admin-map-box'

export interface Leg {
	via_waypoints: any[];
	admins: Admin[];
	weight: number;
	duration: number;
	steps: any[];
	distance: number;
	summary: string;
}
