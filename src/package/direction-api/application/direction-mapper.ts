import {
  Err,
  Ok,
  Result,
} from 'oxide.ts'
import {
	Direction,
	newDirectionFromJson
} from 'src/package/direction-api/domain/models/direction'

export const directionFromJson = ( json: Record<string, any> ): Result<Direction, string> => {
	try {
		return Ok(
			newDirectionFromJson(json)
		)
	}
	catch ( e ) {
    console.log('error direction from json')
		console.log( e )
		return Err('error direction from json')
	}
}

export const directionToJson = ( direction: Direction ): Record<string, any> => {
	return {
		coordinates: direction.coordinates.values
	}
}
