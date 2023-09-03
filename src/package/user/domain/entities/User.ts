import {UserID} from "../value-objects/UserID";
import {UserEmail} from "../value-objects/UserEmail";
import {UserName} from "../value-objects/UserName";
import {UserLastName} from "../value-objects/UserLastName";
import {UserPassword} from "../value-objects/UserPassword";
import {UserPhone} from "../value-objects/UserPhone";
import {UserBirthDay} from "../value-objects/UserBirthDay";
import {UserDescription} from "../value-objects/UserDescription";

export class User {
  private constructor(
    readonly id :UserID,
    readonly email :UserEmail,
    readonly name :UserName,
    readonly lastName :UserLastName,
    readonly password :UserPassword,
    readonly description :UserDescription,
    readonly phone :UserPhone,
    readonly birthDay :UserBirthDay,
  ) {
  }

  static created(
    id :UserID,
    email :UserEmail,
    name :UserName,
    lastName :UserLastName,
    password :UserPassword,
    description :UserDescription,
    phone :UserPhone,
    birthDay :UserBirthDay
  ) : User{
    return new User(
      id ,
      email ,
      name ,
      lastName ,
      password ,
      description,
      phone ,
      birthDay ,
    )
  }

  static from(
    id :UserID,
    email :UserEmail,
    name :UserName,
    lastName :UserLastName,
    password :UserPassword,
    description :UserDescription,
    phone :UserPhone,
    birthDay :UserBirthDay
  ) : User{
    return new User(
      id ,
      email ,
      name ,
      lastName ,
      password ,
      description,
      phone ,
      birthDay ,
    )
  }
}
