import {z} from "zod";

export class TripPrice {
  constructor(readonly value : number) {
    z.number().nonnegative().parse(value)
  }
}
