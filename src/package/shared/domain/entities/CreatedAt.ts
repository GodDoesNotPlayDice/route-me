import {z} from "zod";

export class CreatedAt {
  constructor(private date : Date) {
    z.date().parse(date)
  }
}
