import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { DriverCarModel } from 'src/package/driver-car/domain/models/driver-car-model'
import { DriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'

export interface DriverCar {
  id: DriverCarID
  model: DriverCarModel
  seat: DriverCarSeat
}
