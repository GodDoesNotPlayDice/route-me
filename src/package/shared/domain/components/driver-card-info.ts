import { Avatar } from 'src/package/shared/domain/components/avatar'

export interface DriverCardInfo {
	id: string
	cost: string
	currency: string
	date: Date
	startLocationName: string
	endLocationName: string
	driverAvatar: Avatar
	state: string
	passengerUrls: Array<string | null>
}
