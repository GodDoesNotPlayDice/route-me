import { Avatar } from 'src/package/shared/domain/components/avatar'

export interface DriverCardInfo {
  cost: number
  date: Date
  startLocationName: string
  endLocationName: string
  driverAvatar: Avatar
  state: string
  passengerUrls: string[]
}
