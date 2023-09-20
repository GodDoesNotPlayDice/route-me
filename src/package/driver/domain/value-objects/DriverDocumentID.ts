import {z} from "zod";

export class DriverDocumentID {
  constructor(readonly value : string) {
    z.string().parse(value)
  }
}
