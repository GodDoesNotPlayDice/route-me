import {z} from "zod";

type TripStateType = 'open' | 'progress' | 'finish'

const TripStateEnum = z.enum(['open', 'progress', 'finish'])
type TripStateEnum = z.infer<typeof TripStateEnum>

export class TripState {
  constructor(readonly value : TripStateType) {
    TripStateEnum.parse(value)
  }
}
