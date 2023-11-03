import { Avatar } from 'src/package/shared/domain/components/avatar'

export interface DriverCardInfo {
	id: string
	cost: string
	currency: string
	date: string
	startLocationName: string
	endLocationName: string
	driverAvatar: Avatar
	state: string
	passengerUrls: string[]
}
