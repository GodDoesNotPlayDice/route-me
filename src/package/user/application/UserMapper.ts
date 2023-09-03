import {UserID} from "../domain/value-objects/UserID";
import {UserEmail} from "../domain/value-objects/UserEmail";
import {UserName} from "../domain/value-objects/UserName";
import {UserLastName} from "../domain/value-objects/UserLastName";
import {UserPassword} from "../domain/value-objects/UserPassword";
import {UserPhone} from "../domain/value-objects/UserPhone";
import {UserBirthDay} from "../domain/value-objects/UserBirthDay";
import {None, Option, Some} from "oxide.ts";
import {User} from "../domain/entities/User";
import {UserDescription} from "../domain/value-objects/UserDescription";

export class UserMapper {
  static convert(
    id :string,
    email :string,
    name :string,
    lastName :string,
    password :string,
    description:string,
    phone :string,
    birthDay :Date,
  ): Option<User>{
    try {
      return Some(
        User.from(
          new UserID(id),
          new UserEmail(email),
          new UserName(name),
          new UserLastName(lastName),
          new UserDescription(description),
          new UserPassword(password),
          new UserPhone(phone),
          new UserBirthDay(birthDay)
        )
      )
    }
    catch (e){
      return None
    }
  }
}
