import {z} from "zod";

export class UserPassword {
  constructor(readonly value : string) {
    z.string().min(8).parse(value)
  }
}
