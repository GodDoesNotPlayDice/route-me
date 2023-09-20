import {z} from "zod";

export class PassengerID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
