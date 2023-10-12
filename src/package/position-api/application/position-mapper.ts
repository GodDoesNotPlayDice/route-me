import {
  None,
  Option,
  Some
} from 'oxide.ts'
import {
  newPosition,
  Position
} from 'src/package/position-api/domain/models/position'

export const positionFromJson = ( json: Record<string, any> ): Option<Position> => {
  try {
    return Some(
      newPosition({
        lat: Number( json[ 'latitude' ] ),
        lng: Number( json[ 'longitude' ] )
      })
    )
  }
  catch ( e ) {
    console.log( 'error position from json' )
    console.log( e )
    return None
  }
}

export const positionToJson = ( position: Position ): Record<string, any> => {
  return {
    latitude: position.lat,
    longitude: position.lng,
  }
}
