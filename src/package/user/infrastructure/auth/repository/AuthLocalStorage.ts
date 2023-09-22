import { Storage } from '@ionic/storage-angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserMapper } from 'src/package/user/application'
import {
  AuthRepository,
  User,
  UserEmail,
  UserPassword
} from 'src/package/user/domain'

export class AuthLocalStorage implements AuthRepository {
  constructor( private storage: Storage ) {
    this.init()
  }

  private async init() {
    await this.storage.create()
  }

  login( email: UserEmail,
    password: UserPassword ): Promise<Result<User, string>> {
    return Promise.resolve( Err( 'data error' ) )
  }

  async register( user: User ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }
}

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
