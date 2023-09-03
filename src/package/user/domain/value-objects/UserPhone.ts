import {z} from "zod";

export class UserPhone {
  constructor(readonly value : string) {
    // z.string().regex(RegExp('^\\(\\+\\d+\\)\\s\\d{4}-\\d{4}')).parse(value);
    z.string().parse(value);
  }
}
