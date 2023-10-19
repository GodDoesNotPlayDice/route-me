import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class PassengerDaoFirebase implements PassengerDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'passengerv2'

  async create( passenger: Passenger ): Promise<Result<string, Error>> {

    return Err( new FirebaseOperationException() )
  }

  async delete( email: Email ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

  async getAll(): Promise<Result<Passenger[], Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async getByEmail( email: Email ): Promise<Result<Passenger, Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async update( user: Passenger ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }


}
