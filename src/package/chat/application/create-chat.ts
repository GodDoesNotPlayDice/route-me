import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { ulid } from 'ulidx'

export const createChat = async ( dao: ChatDao ): Promise<Result<Chat, Error[]>> => {

  const id = newChatID( {
    value: ulid()
  } )

  if ( id.isErr() ) {
    return Err( [id.unwrapErr()] )
  }

  const chat: Chat = {
    id      : id.unwrap(),
    messages: []
  }
  const result     = await dao.create( chat )

  if ( result.isErr() ) {
    return Err( result.unwrapErr() )
  }

  return Ok( chat )
}
