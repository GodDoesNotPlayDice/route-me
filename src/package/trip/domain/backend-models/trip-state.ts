import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripStateInvalidException } from 'src/package/trip/domain/backend-models/exceptions/trip-state-invalid-exception'
import { z } from 'zod'

export enum TripStateEnum {
  Open   = 'Open',
  Progress = 'Progress',
  Completed   = 'Completed'
}

export const TripEnumSchema = z.nativeEnum( TripStateEnum )

type TripStateEnumType = z.infer<typeof TripEnumSchema>

export type TripState = TripStateEnumType

export interface TripStateProps {
  value : string
}

/**
 * Create a trip state instance
 * @throws {TripStateInvalidException} - if state is invalid
 */
export const newTripState = ( props: TripStateProps ): Result<TripState, Error> => {
  const result = TripEnumSchema.safeParse(props.value)

  if ( !result.success ) {
    return Err(new TripStateInvalidException())
  }
  else {
    return Ok(result.data)
  }
}
