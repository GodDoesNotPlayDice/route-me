import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverID } from 'src/package/driver/domain/models/driver-id'

export interface Driver {
  id: DriverID
  documents: DriverDocument[]
  car: DriverCar
}
