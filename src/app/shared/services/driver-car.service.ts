import { Injectable } from '@angular/core';
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'

@Injectable({
  providedIn: 'root'
})
export class DriverCarService {

  constructor(private driverCarDao : DriverCarDao) { }

	async getDriverCar() : Promise<DriverCar[]>{
		const result = await this.driverCarDao.getAll()
		if ( result.isErr() ){
			console.log( result.unwrapErr() )
			return []
		}
		return result.unwrap()
	}
}
