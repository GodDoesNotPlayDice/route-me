import {
	Err,
	Ok,
	Result,
	Some
} from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Trip } from 'src/package/trip/domain/models/trip'

export const updateDriver = async ( dao: DriverDao, driver: Driver, props: {
	documents?: DriverDocument[]
	activeTrip?: Trip
	driverCar?: DriverCar
} ): Promise<Result<Driver, Error[]>> => {
	const newDriver: Driver = {
		id        : driver.id,
		enabled   : driver.enabled,
		passenger : driver.passenger,
		activeTrip: props.activeTrip === undefined ? driver.activeTrip : Some(
			props.activeTrip ),
		driverCar : props.driverCar ?? driver.driverCar,
		documents : props.documents ?? driver.documents
	}

	const result = await dao.update( newDriver )

	if ( result.isErr() ) {
		console.log( 'error update driver' )
		console.log( result.unwrapErr() )
		return Err( [ ...result.unwrapErr() ] )
	}

	return Ok( newDriver )
}
