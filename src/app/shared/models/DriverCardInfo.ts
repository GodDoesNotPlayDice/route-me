import { Avatar } from 'src/app/shared/models/Avatar'

export type DriverInfoState = 'progress' | 'completed' | 'open';

export interface DriverCardInfo {
	driverAvatar: Avatar,
	cost: number,
	date: Date,
	state : DriverInfoState,
	startLocation: string,
	endLocation: string,
	passengerAvatars: Avatar[]
}
