import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DriverIdInvalidException } from 'src/package/driver/domain/exceptions/driver-id-invalid-exception'
import { z } from 'zod'

export const DriverIDSchema = z.object( {
  value: z.string()
} )

type DriverIDType = z.infer<typeof DriverIDSchema>

export interface DriverID extends DriverIDType {}

interface DriverIDProps {
  value: string
}

/**
 * Create driver id instance
 * @throws {DriverIdInvalidException} - if id is invalid
 */
export const newDriverID = ( props: DriverIDProps ): Result<DriverID, Error> => {
  const result = DriverIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err(new DriverIdInvalidException())
  }
  else {
    return Ok(result.data)
  }
  }
