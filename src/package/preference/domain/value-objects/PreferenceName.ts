import {z} from "zod";

export class PreferenceName {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
