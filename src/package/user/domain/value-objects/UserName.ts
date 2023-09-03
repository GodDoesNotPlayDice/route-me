import {z} from "zod";

export class UserName {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
