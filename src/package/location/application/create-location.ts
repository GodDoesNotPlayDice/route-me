import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { newLocationCountryCode } from 'src/package/location/domain/models/location-country-code'
import { newLocationID } from 'src/package/location/domain/models/location-id'
import { newLocationName } from 'src/package/location/domain/models/location-name'
import {
  Position,
} from 'src/package/position-api/domain/models/position'
import { ulid } from 'ulidx'

export const createLocation = async ( repository: LocationDao, props: {
  name: string,
  countryCode: string,
  position: Position
} ): Promise<Result<Location, Error[]>> => {
  const err : Error[] = []

  const id = newLocationID({
    value: ulid()
  })

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const name = newLocationName({
    value: props.name
  })

  if ( name.isErr() ) {
    err.push( name.unwrapErr() )
  }

  const code = newLocationCountryCode({
    value: props.countryCode
  })

  if ( code.isErr() ) {
    err.push( code.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  const location : Location = {
    id         : id.unwrap(),
    name       : name.unwrap(),
    countryCode: code.unwrap(),
    position   : props.position
  }

  const result = await repository.create(location)

  if ( result.isErr() ){
    err.push( result.unwrapErr())
    return Err( err )
  }

  return Ok(location)
}
