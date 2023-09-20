import {z} from "zod";

export class Gender {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
