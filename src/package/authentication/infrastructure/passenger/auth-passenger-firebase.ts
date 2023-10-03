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

  async logout(id: UserID): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  async delete( id: UserID ): Promise<Result<boolean, string>> {
    const keySaved = await this.getKey( id )

    if ( keySaved.isErr() ) {
      return Promise.resolve( Err( keySaved.unwrapErr() ) )
    }

    let completed : string | null = null
    await this.firebase.database.ref( 'passengers' ).child(keySaved.unwrap()).remove(
      ( error ) => {
        if ( !error ) {
          completed = 'completed'
        }
      }
    )

    if ( completed === null ) {
      return Promise.resolve( Err( 'error' ) )
    }

    return Promise.resolve( Ok(true) )
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
      let completed : string | null = null
      await this.firebase.database.ref( 'passengers' )
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
                  },
                  ( error ) => {
                    if ( !error ){
                      completed = 'completed'
                    }
                  }
                )

      if ( completed === null ) {
        return Promise.resolve( Err( 'error' ) )
      }

      return Promise.resolve( Ok( 'pasn reg' ) )
    }
    catch ( e ) {
      return Promise.resolve( Err( 'not pasn reg' ) )
    }
  }

  async update( passenger: Passenger ): Promise<Result<boolean, string>> {
    const keySaved = await this.getKey( passenger.userID )

    if ( keySaved.isErr() ) {
      return Promise.resolve( Err( keySaved.unwrapErr() ) )
    }
    let completed : string | null = null

    await this.firebase.database.ref( 'passengers' ).child(keySaved.unwrap())
      .set( {
        id         : passenger.id.value,
        userID     : passenger.userID.value,
        name       : passenger.name.value,
        lastName   : passenger.lastName.value,
        description: passenger.description.value,
        phone      : passenger.phone.value,
        birthDay   : passenger.birthDay.value,
        country    : passenger.country.value,
        gender     : passenger.gender,
        preferences: passenger.preferences.map( ( preference ) => {
          return {
            id: preference.value
          }
        } )
      } ,
        ( error ) => {
          if ( !error ) {
            completed = 'completed'
          }
        })


    if ( completed === null ) {
      return Promise.resolve( Err( 'error' ) )
    }

    return Promise.resolve( Ok(true) )
  }

  private async getKey(id: UserID) : Promise<Result<string, string>>{
    return await this.firebase.database.ref( `passengers` )
     .orderByChild( 'userID' )
     .equalTo(
       id.value )
     .get()
     .then(
       async ( snapshot ) => {

         let key: string | null = null

         snapshot.forEach(
           ( childSnapshot ) => {
             key = childSnapshot.key
           } )

         if ( key === null ) {
           return Promise.resolve(
             Err( 'error' ) )
         }
         return Promise.resolve(
           Ok( key ) )
       } )
  }
}
