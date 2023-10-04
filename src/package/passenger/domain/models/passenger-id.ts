import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { z } from 'zod'

export const PassengerIDSchema = z.object( {
	value : z.string(),
} )

type PassengerIDType = z.infer<typeof PassengerIDSchema>
export interface PassengerID extends PassengerIDType {}

export interface PassengerIDProps {
	value : string
}

export const newPassengerID = (props : PassengerIDProps): PassengerID => {
	return PassengerIDSchema.parse( {
		value : props.value
	} )
}

export const newPassengerIDResult = async (props : PassengerIDProps): Promise<Result<PassengerID, Error>> => {
  try {
    const id : PassengerID = PassengerIDSchema.parse( {
      value : props.value
    } )
    return Ok(id)
  }
  catch ( error ) {
    const e = error instanceof Error ? error : new Error( 'unknow passenger id error' )
    return Err(e)
  }
}
