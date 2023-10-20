import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DriverCarModelInvalidException } from 'src/package/driver-car/domain/exceptions/driver-car-model-invalid-exception'
import { z } from 'zod'

export const DriverCarModelSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type DriverCarModelType = z.infer<typeof DriverCarModelSchema>

export interface DriverCarModel extends DriverCarModelType {}

interface DriverCarModelProps {
  value: string
}

/**
 * Create driver car model instance
 * @throws {DriverCarModelInvalidException} - if model is invalid
 */
export const newDriverCarModel = ( props: DriverCarModelProps ): Result<DriverCarModel, Error> => {
  const result = DriverCarModelSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new DriverCarModelInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
