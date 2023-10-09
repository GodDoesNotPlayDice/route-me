import {
  Err,
  Ok,
  Result,
} from 'oxide.ts'
import {
  newStreetsDataFromJson,
  Street
} from 'src/package/street-api/domain/models/street'

export const streetFromJson = ( json: Record<string, any> ): Result<Street, string> => {
  try {
    return Ok(
      newStreetsDataFromJson(json)
    )
  }
  catch ( e ) {
    console.log('error street from json')
    console.log( e )
    return Err('error street from json')
  }
}

export const streetToJson = ( street: Street ): Record<string, any> => {
  return {
    center: {
      lat: street.center.lat,
      lng: street.center.lng
    },
    place_name: street.place_name,
    text: street.text
  }
}
