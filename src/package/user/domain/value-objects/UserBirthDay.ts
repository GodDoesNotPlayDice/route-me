import {z} from "zod";

export class UserBirthDay {
  constructor(readonly value : Date) {
    const currentDate = new Date()
    z.date().max(
      new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDay()
      )
    ).parse(value);
  }
}
