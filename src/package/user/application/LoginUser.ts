import {AuthRepository} from "../domain/repository/AuthRepository";
import {UserEmail} from "../domain/value-objects/UserEmail";
import {UserPassword} from "../domain/value-objects/UserPassword";
import {Err, Ok, Result} from "oxide.ts";
import {User} from "../domain/entities/User";

export class LoginUser {
  constructor(private repository : AuthRepository) {
  }

  async execute(email : string, password: string): Promise<Result<User, string>>{

    const result = await this.repository.login(
      new UserEmail(email),
      new UserPassword(password)
    )
    if (result.isErr()){
      return Promise.resolve(Err(result.unwrapErr()));
    }
    return Promise.resolve(Ok(result.unwrap()));
  }
}
