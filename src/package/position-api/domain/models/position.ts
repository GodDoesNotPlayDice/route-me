import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PositionInvalidException } from 'src/package/position-api/domain/exceptions/position-invalid-exception'
import { z } from 'zod'

export const PositionSchema = z.object( {
  lat : z.number(),
  lng: z.number()
} )

type PositionType = z.infer<typeof PositionSchema>
export interface Position extends PositionType {}

export interface PositionProps {
  lat : number,
  lng: number
}

/**
 * Create position instance
 * @throws {PositionInvalidException} - if position is invalid
 */
export const newPosition = (props : PositionProps): Result<Position, Error> => {
  const result = PositionSchema.safeParse( {
    lat: props.lat,
    lng: props.lng
  } )

  if ( !result.success ) {
    return Err( new PositionInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
