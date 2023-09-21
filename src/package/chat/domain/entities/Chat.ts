import { ChatID } from 'src/package/chat/domain/value-objects'
import { TripID } from 'src/package/trip/domain/value-objects/TripID'

export class Chat {
  private constructor(
    readonly id: ChatID,
    readonly tripID: TripID
  )
  {}

  static from(
    id: ChatID,
    tripID: TripID
  ): Chat {
    return new Chat(
      id,
      tripID
    )
  }
}
