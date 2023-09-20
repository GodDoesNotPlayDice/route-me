import {z} from "zod";

export class TripID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
