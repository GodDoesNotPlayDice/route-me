import {
	None,
	Option,
	Some
} from 'oxide.ts'
import {
	Direction,
	newDirectionFromJson
} from 'src/package/direction-api/domain/models/direction'

export const directionFromJson = ( json: Record<string, any> ): Option<Direction> => {
	try {
		return Some(
			newDirectionFromJson(json)
		)
	}
	catch ( e ) {
		console.log( 'error direction from json' )
		console.log( e )
		return None
	}
}

export const directionToJson = ( direction: Direction ): Record<string, any> => {
	return {
		coordinates: direction.coordinates.values
	}
}
