import { Feature } from 'src/package/street-api/infrastructure/map-box/models/feature-map-box'

export interface StreetsDataMapBox {
	type: string;
	query: string[];
	features: Feature[];
	attribution: string;
}
