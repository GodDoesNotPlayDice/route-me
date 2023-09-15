import { Injectable } from '@angular/core';
import {Err, None, Ok, Option, Result, Some} from "oxide.ts";
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

    const result = await this.loginUser.execute(email, password)

    if (result.isErr()){

      return Promise.resolve(Err(result.unwrapErr()));
    }

    this.currentUser = Some(result.unwrap())
    return Promise.resolve(Ok(true));
  }

   async register(
     id :string,
     email :string,
     name :string,
     lastName :string,
     password :string,
     description :string,
     phone :string,
     birthDay :string
   ): Promise<Result<boolean, string>> {
     const result = await this.registerUser.execute(
       id ,
       email ,
       name ,
       lastName ,
       password ,
       description,
       phone ,
       birthDay
     )
     if (result.isErr()){
       return Promise.resolve(Err(result.unwrapErr()));
     }
     return Promise.resolve(Ok(true));
  }
}
