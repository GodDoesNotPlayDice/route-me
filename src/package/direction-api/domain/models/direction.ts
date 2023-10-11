import {
	Geometry,
	GeometryProps,
	newGeometry
} from 'src/package/direction-api/domain/models/geometry'
import { newDirectionMapBox } from 'src/package/direction-api/infrastructure/mapbox/models/direction-map-box'

export interface Direction {
	coordinates: Geometry
}

export interface DirectionProps {
	coordinates: GeometryProps
}

export const newDirectionFromJson = ( json: Record<string, any> ): Direction => {
	return newDirectionMapBox( json)
}

export const newDirection = ( props: DirectionProps ): Direction => {
	return {
		coordinates: newGeometry( {
			values: props.coordinates.values
		} )
	}
}
