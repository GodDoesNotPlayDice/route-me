import { Option } from 'oxide.ts'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { ValidBoolean } from 'src/package/shared/domain/models/valid-bool'
import { Trip } from 'src/package/trip/domain/models/trip'

export interface Driver {
	id: DriverID
	passenger: Passenger
	enabled : ValidBoolean
	activeTrip : Option<Trip>
	documents: DriverDocument[]
	carID: DriverCarID
}
