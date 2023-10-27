import { Avatar } from 'src/package/shared/domain/components/avatar'

export interface DriverCardInfo {
	cost: number
	date: string
	startLocationName: string
	endLocationName: string
	driverAvatar: Avatar
	state: string
	passengerUrls: string[]
}
