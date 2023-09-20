import {z} from "zod";

export class UserCountry {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
