import {
  TripState,
} from 'src/package/trip'
import { z } from 'zod'
import {
  Avatar,
} from './avatar'

export const DriverCardInfoSchema = z.object( {
  cost            : z.number(),
  date            : z.date(),
  startLocation   : z.string(),
  endLocation     : z.string()
} )

type DriverCardInfoType = z.infer<typeof DriverCardInfoSchema>
export interface DriverCardInfo extends DriverCardInfoType{
  driverAvatar    : Avatar,
  state           : TripState,
  passengerAvatars: Avatar[]
}

export interface DriverCardInfoProps {
  driverAvatar    : Avatar,
  state           : TripState,
  passengerAvatars: Avatar[]
}

export const newDriverCardInfo = ( props: DriverCardInfoProps ): DriverCardInfo => {
  return  {
    driverAvatar    : props.driverAvatar,
    cost            : props.cost,
    date            : props.date,
    state           : props.state,
    startLocation   : props.startLocation,
    endLocation     : props.endLocation,
    passengerAvatars: props.passengerAvatars
  }
}
