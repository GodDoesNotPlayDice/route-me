import {z} from "zod";

export class RatingValue {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
