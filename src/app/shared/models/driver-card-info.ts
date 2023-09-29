import {
  Location,
  Money,
  newLocation,
  newMoney
} from 'src/package/shared'
import {
  newValidDate,
  ValidDate
} from 'src/package/shared/domain/models/valid-date'
import {
  TripState,
} from 'src/package/trip'
import {
  Avatar,
} from './avatar'

export interface DriverCardInfo {
  cost            : Money
  date            : ValidDate
  startLocation   : Location
  endLocation   : Location
  driverAvatar    : Avatar
  state           : TripState
  passengerAvatars: Avatar[]
}

export interface DriverCardInfoProps {
  cost            : number
  date            : Date
  startLocation   : string
  endLocation     : string
  driverAvatar    : Avatar
  state           : TripState
  passengerAvatars: Avatar[]
}

export const newDriverCardInfo = ( props: DriverCardInfoProps ): DriverCardInfo => {
  return  {
    driverAvatar    : props.driverAvatar,
    cost            : newMoney({
      value: props.cost
    }),
    date            : newValidDate({
      value: props.date
    }),
    state           : props.state,
    startLocation   : newLocation({
      value: props.startLocation
    }),
    endLocation     : newLocation({
      value: props.endLocation
    }),
    passengerAvatars: props.passengerAvatars
  }
}
