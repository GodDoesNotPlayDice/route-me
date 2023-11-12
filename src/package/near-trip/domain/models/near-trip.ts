import { Option } from 'oxide.ts'
import { DriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { PassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { ImageUrl } from 'src/package/shared/domain/models/image-url'
import { TripLocationName } from 'src/package/trip-location/domain/models/trip-location-name'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'

export interface NearTrip {
	id: TripID
	startLocationName: TripLocationName
	endLocationName: TripLocationName
	price: TripPrice
	startDate: Date
	latitude: number
	longitude: number
	seat: DriverCarSeat
	driverName: PassengerName
	driverLastName: PassengerLastName
	driverImage: Option<ImageUrl>
	passengersImages: Option<ImageUrl>[]
}
