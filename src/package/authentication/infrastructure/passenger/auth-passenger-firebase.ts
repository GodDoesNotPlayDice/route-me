import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/domain/repository/auth-passenger-repository'
import { passengerFromJson } from 'src/package/passenger/application/passenger-mapper'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { UserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

export class AuthPassengerFirebase implements AuthPassengerRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  public delete( id: UserID ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async login( userID: UserID ): Promise<Result<Passenger, string>> {
    return await this.firebase.database.ref( 'passengers' )
                     .orderByChild( 'userID' )
                     .equalTo( userID.value )
                     .get()
                     .then( async ( snapshot ) => {
                       const snapshotValue = Object.values(
                         snapshot.val() )[0] as Record<string, any>
                       const passenger     = passengerFromJson( snapshotValue )
                       if ( passenger.isNone() ) {
                         console.log( 'none' )
                         return Promise.resolve( Err( 'passenger not found' ) )
                       }
                       return Promise.resolve( Ok( passenger.unwrap() ) )
                     } )
  }

  async register( passenger: Omit<Passenger, 'id' | 'preferences' | 'description'> ): Promise<Result<string, string>> {
    try {

      const path = await this.firebase.database.ref( 'passengers' )
                             .push(
                               {
                                 id         : ulid(),
                                 userID     : passenger.userID.value,
                                 name       : passenger.name.value,
                                 lastName   : passenger.lastName.value,
                                 description: '',
                                 phone      : passenger.phone.value,
                                 birthDay   : passenger.birthDay.value,
                                 country    : passenger.country.value,
                                 gender     : passenger.gender,
                                 preferences: []
                               }
                             )
      return Promise.resolve( Ok( 'pasn reg' ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'not pasn reg' ) )
    }
  }

  async update( passenger: Partial<Passenger> ): Promise<Result<Passenger, string>> {
      console.log( 'update fire')
    const userID = passenger.userID?.value


    if ( !userID ) {
      console.log( 'no user id')
      return Promise.resolve( Err( 'error' ) )
    }

    const passengerKey = await this.firebase.database.ref( 'passengers' )
                                        .orderByChild( 'userID' )
                                        .equalTo( userID )
                                        .get()
                                        .then( async ( snapshot ) => {
                                          //TODO: guardar key generada de firebase en id entidad
                                          return '1'
                                        } )

    //TODO: ver como actualizar correctamente objetos
    // const passengerUpdate = await this.firebase.database.ref( `passengers/${passengerKey}` ).update({})

    return Promise.resolve( Err( 'error' ) )
  }
}
