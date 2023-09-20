import {z} from "zod";

export class TripDescription {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
