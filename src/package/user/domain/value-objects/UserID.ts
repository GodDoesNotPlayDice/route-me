import {z} from "zod";

export class UserID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
