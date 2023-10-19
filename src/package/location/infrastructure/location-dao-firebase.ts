import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class LocationDaoFirebase implements LocationDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'locations'

  async create( location: Location ): Promise<Result<boolean, Error>> {
    let completed: string | null = null
    await this.firebase.database.ref( this.collectionKey )
              .push(
                {
                  id         : location.id.value,
                  name       : location.name.value,
                  countryCode: location.countryCode.value,
                  position   : {
                    latitude : location.position.lat,
                    longitude: location.position.lng
                  }
                },
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                }
              )

    if ( completed === null ) {
      return Err( new FirebaseOperationException() )
    }

    return Ok( true )
  }

  async delete( id: LocationID ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException )
  }

  async getAll(): Promise<Result<Location[], Error[]>> {
    return Err( [ new FirebaseOperationException ] )
  }

  async getById( id: LocationID ): Promise<Result<Location, Error[]>> {
    return Err( [ new FirebaseOperationException ] )
  }

  async update( location: Location ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

}
