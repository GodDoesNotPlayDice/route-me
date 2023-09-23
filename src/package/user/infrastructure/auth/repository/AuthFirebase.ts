import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { BehaviorSubject } from 'rxjs'
import {
  AuthRepository,
  User,
  UserEmail,
  UserPassword
} from 'src/package/user/domain'
import { UserMapper } from 'src/package/user/application/UserMapper'

export class AuthFirebase implements AuthRepository {
  constructor( private firebase: AngularFireDatabase ) {
  }

  protected users: BehaviorSubject<User[]>

  getAll(): Promise<Result<User[], string>> {

    console.log( 'firebaseinit' )
    console.log( this.firebase.database.ref( 'users' ) )
    this.firebase.database.ref( 'users' )
        .get()
        .then( ( snapshot ) => {
          for ( const snapshotElement of Object.values( snapshot.val() ) ) {
            const s = UserMapper.fromJson(
              snapshotElement as Record<string, any> )
            if ( s.isNone() ) {
              console.log( 'none' )
              continue
            }
            console.log( s.unwrap() )
          }
        } )
    console.log( 'firebaseend' )

    return Promise.resolve( Ok( [] ) )

    // return Promise.resolve( Err("err") )
  }


  login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    const data: Record<string, any> = {
      id         : 'abc',
      email      : 'hola@gmail.com',
      name       : 'juan',
      lastName   : 'pedro',
      password   : '12345678',
      description: 'Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.',
      phone      : '(+56)1234-1234',
      birthDay   : new Date( '1990-03-25' ),
      country    : 'CL',
      gender     : 'Hombre',
      preferences: []
    }
    const user                      = UserMapper.fromJson( data )

    if ( user.isNone() ) {
      return Promise.resolve( Err( 'data error' ) )
    }
    return Promise.resolve( Ok( user.unwrap() ) )
  }

  register( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }
}
