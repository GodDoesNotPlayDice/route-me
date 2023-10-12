import {
  Location,
} from 'src/package/location/domain/models/location'
import {
  Money,
  newMoney
} from 'src/package/shared/domain/models/money'
import {
  newValidDate,
  ValidDate
} from 'src/package/shared/domain/models/valid-date'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'
import {
  Avatar,
} from 'src/package/shared/domain/components/avatar'

export interface DriverCardInfo {
  cost            : Money
  date            : ValidDate
  startLocation   : Location
  endLocation   : Location
  driverAvatar    : Avatar
  state           : TripStateEnum
  passengerAvatars: Avatar[]
}

export interface DriverCardInfoProps {
  cost            : number
  date            : Date
  startLocation   : Location
  endLocation     : Location
  driverAvatar    : Avatar
  state           : TripStateEnum
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
    startLocation   : props.startLocation,
    endLocation     : props.endLocation,
    passengerAvatars: props.passengerAvatars
  }
}
