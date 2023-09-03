import {AuthRepository} from "../domain/repository/AuthRepository";
import {UserEmail} from "../domain/value-objects/UserEmail";
import {UserPassword} from "../domain/value-objects/UserPassword";
import {Err, Ok, Result} from "oxide.ts";
import {User} from "../domain/entities/User";
import {UserID} from "../domain/value-objects/UserID";
import {UserName} from "../domain/value-objects/UserName";
import {UserLastName} from "../domain/value-objects/UserLastName";
import {UserPhone} from "../domain/value-objects/UserPhone";
import {UserBirthDay} from "../domain/value-objects/UserBirthDay";
import {UserMapper} from "../application/UserMapper";
import {UserDescription} from "../domain/value-objects/UserDescription";

export class AuthDataMemory implements AuthRepository{
  constructor() {
  }

  private context : User[] = defaultUsers

  async login(email: UserEmail, password: UserPassword): Promise<Result<User, string>> {
    for (const user of this.context) {
      if (user.email.value === email.value && user.password.value === password.value){
        const response = UserMapper.convert(
          user.id.value,
          user.email.value,
          user.name.value,
          user.lastName.value,
          user.password.value,
          user.description.value,
          user.phone.value,
          user.birthDay.value,
        )

        if (response.isNone()){
          return Promise.resolve(Err("map error"));
        }

        return Promise.resolve(Ok(user));
      }
    }
    return Promise.resolve(Err("memory error"));
  }

  register(user:User): Promise<Result<boolean, string>> {
    try {
      this.context.push(user)
      return Promise.resolve(Ok(true));
    }
    catch (e) {
      return Promise.resolve(Err("memory error"));
    }
  }
}

export const defaultUsers : User[] = [
  User.from(
    new UserID("abc"),
    new UserEmail("hola@gmail.com"),
    new UserName("juan"),
    new UserLastName("pedro"),
    new UserPassword("12345678"),
    new UserDescription("Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.",),
    new UserPhone("(+56)1234-1234"),
    new UserBirthDay(new Date("1990-03-25"))
)
]
