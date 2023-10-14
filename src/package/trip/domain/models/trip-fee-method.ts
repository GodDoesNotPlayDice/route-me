import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { TripFeeInvalidException } from 'src/package/trip/domain/exceptions/trip-fee-invalid-exception'
import { z } from 'zod'

export enum TripFeeMethodEnum {
  Basic = 'Basic',
  Other = 'Other',
}

export const TripFeeMethodSchema = z.nativeEnum( TripFeeMethodEnum )

export type TripFeeMethod = z.infer<typeof TripFeeMethodSchema>

export interface TripFeeMethodProps {
  value: string
}

/**
 * Create a trip fee method instance
 * @throws {TripFeeInvalidException} - if trip fee is invalid
 */
export const newTripFeeMethod = ( props: TripFeeMethodProps ): Result<TripFeeMethod, Error> => {
  const result = TripFeeMethodSchema.safeParse( props.value )

  if ( !result.success ) {
    return Err( new TripFeeInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
