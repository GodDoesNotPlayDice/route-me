import {z} from "zod";

export class TripHistoryID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
