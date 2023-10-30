import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { DriverCarModel } from 'src/package/driver-car/domain/models/driver-car-model'
import { DriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { ImageUrl } from 'src/package/shared/domain/models/image-url'

export interface DriverCar {
	id: DriverCarID
	model: DriverCarModel
	seat: DriverCarSeat
	image: ImageUrl
}

export interface DriverCarProps {
	id: string
	model: string
	seat: string
	image: string
}
