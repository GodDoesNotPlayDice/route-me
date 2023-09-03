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
import {UserDescription} from "../domain/value-objects/UserDescription";

export class RegisterUser {
  constructor(private repository : AuthRepository) {
  }

  async execute(
    id :string,
    email :string,
    name :string,
    lastName :string,
    password :string,
    description :string,
    phone :string,
    birthDay :string,
  ): Promise<Result<boolean, string>> {
    try {
      const result = await this.repository.register(
        User.created(
          new UserID(id),
          new UserEmail(email),
          new UserName(name),
          new UserLastName(lastName),
          new UserPassword(password),
          new UserDescription(description),
          new UserPhone(phone),
          new UserBirthDay(new Date(birthDay)),
        )
      )
      const response = result.unwrap()
      return Promise.resolve(Ok(response))
    } catch (e) {
      return Promise.resolve(Err("register error"));
    }
  }
}
