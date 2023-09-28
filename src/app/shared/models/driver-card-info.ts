import {
  TripStateEnum,
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

export interface DriverCardInfo extends z.infer<typeof DriverCardInfoSchema>{
  driverAvatar    : Avatar,
  state           : TripStateEnum,
  passengerAvatars: Avatar[]
}

export const newDriverCardInfo = ( props: DriverCardInfo ): DriverCardInfo => {
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
