import { Result } from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'

export const getDriverCarById = async ( dao: DriverCarDao,
	id: DriverCarID ): Promise<Result<DriverCar, Error[]>> => {
	return await dao.getByID( id )
}
