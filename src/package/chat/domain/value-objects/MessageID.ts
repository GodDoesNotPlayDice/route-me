import {z} from "zod";

export class MessageID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
