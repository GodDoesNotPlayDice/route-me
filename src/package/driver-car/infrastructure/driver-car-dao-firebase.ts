import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Result
} from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class DriverCarDaoFirebase implements DriverCarDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'driverscar'

  async create( driver: DriverCar ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

  async delete( email: Email ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

  async getAll(): Promise<Result<DriverCar[], Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async getByEmail( email: Email ): Promise<Result<DriverCar, Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async update( driver: DriverCar ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

}
