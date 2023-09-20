import {z} from "zod";

export class PreferenceID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
