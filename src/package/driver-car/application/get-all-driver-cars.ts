import { Result } from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'

export const getAllDriverCars = async ( dao: DriverCarDao ): Promise<Result<DriverCar[], Error[]>> => {
	return await dao.getAll()
}
