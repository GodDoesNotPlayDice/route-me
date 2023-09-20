import { Injectable } from '@angular/core';
import {Err, None, Ok, Option, Result, Some} from "oxide.ts";
import { UserRegisterState } from 'src/app/state/user-register/user-register.state'
import { PreferenceID } from 'src/package/preference'
import { Gender } from 'src/package/shared'
import {
  UserBirthDay,
  UserCountry,
  UserDescription,
  UserEmail,
  UserLastName,
  UserName,
  UserPassword,
  UserPhone
} from 'src/package/user'
import {LoginUser} from 'src/package/user/application/LoginUser';
import {RegisterUser} from 'src/package/user/application/RegisterUser';
import {User} from 'src/package/user/domain/entities/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginUser : LoginUser,
    private registerUser : RegisterUser,
    ) { }

  currentUser : Option<User> = None

  async login(email : string, password: string): Promise<Result<boolean, string>> {

    const result = await this.loginUser.execute(
      new UserEmail(email),
      new UserPassword(password)
    )


    if (result.isErr()){

      return Promise.resolve(Err(result.unwrapErr()));
    }

    this.currentUser = Some(result.unwrap())
    return Promise.resolve(Ok(true));
  }

   async register(
     user: UserRegisterState
   ): Promise<Result<boolean, string>> {
     //TODO: verificar error
     const prefs = user.preferences.map((preference : any) => {
        return new PreferenceID(preference.id)
      })

     const result = await this.registerUser.execute(
       new UserEmail(user.email),
       new UserName(user.name),
       new UserLastName(user.lastName),
       new UserPassword(user.password),
       new UserDescription(user.description),
       new UserPhone(user.phone),
       new UserCountry(user.country),
       new UserBirthDay(user.birthDay),
       new Gender(user.genre),
       prefs
     )
     if (result.isErr()){
       return Promise.resolve(Err(result.unwrapErr()));
     }
     return Promise.resolve(Ok(true));
  }
}
