import {AuthRepository} from "../domain/repository/AuthRepository";
import {UserEmail} from "../domain/value-objects/UserEmail";
import {UserPassword} from "../domain/value-objects/UserPassword";
import {Err, Ok, Result} from "oxide.ts";
import {User} from "../domain/entities/User";
import {UserMapper} from "../application/UserMapper";

export class AuthDataFirebase implements AuthRepository{
  constructor() {
  }

  login(email: UserEmail, password: UserPassword): Promise<Result<User, string>> {
    const user = UserMapper.convert(
      "abc",
    "hola@gmail.com",
    "juan",
    "pedro",
    "12345678",
    "Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.",
    "(+56)1234-1234",
    new Date("1990-03-25")
    )

    if (user.isNone()){
      return Promise.resolve(Err("data error"));
    }
    return Promise.resolve(Ok(user.unwrap()));
  }

  register(user:User): Promise<Result<boolean, string>> {
    return Promise.resolve(Ok(true));
  }
}
