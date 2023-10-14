import { Result } from 'oxide.ts'
import {
	newStreet,
	Street
} from 'src/package/street-api/domain/models/street'
import {
	newStreetsData,
	StreetsData,
	StreetsDataProps
} from 'src/package/street-api/domain/models/streets-data'
import { Feature } from 'src/package/street-api/infrastructure/map-box/models/feature-map-box'

export interface StreetsDataMapBox {
	type: string;
	query: string[];
	features: Feature[];
	attribution: string;
}

export const newStreetMapBox = ( json: Record<string, any> ): Result<Street, Error[]> => {
	return newStreet( {
		center: {
			lat: json['center'][1],
			lng: json['center'][0]
		},
		place : json['place_name'],
		name  : json['text']
	} )
}

export const newStreetsDataMapBox = ( json: Record<string, any> ): Result<StreetsData, Error[]> => {
	const data: StreetsDataProps = {
		streets: Object.values( json['features'] )
		               .map( ( value ) => {
			               const v = value as Record<string, any>
			               return {
				               center: {
					               lat: v['center'][1],
					               lng: v['center'][0]
				               },
				               place : v['place_name'],
				               name  : v['text']
			               }
		               } )
	}

	return newStreetsData( data )
}
