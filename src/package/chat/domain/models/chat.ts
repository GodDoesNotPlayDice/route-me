import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export interface Chat {
  id: ChatID,
  tripID: TripID
}
