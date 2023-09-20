import {z} from "zod";

export class Location {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
