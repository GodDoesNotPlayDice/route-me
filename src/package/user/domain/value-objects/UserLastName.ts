
import {z} from "zod";

export class UserLastName {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
