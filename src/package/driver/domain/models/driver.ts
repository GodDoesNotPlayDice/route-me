import {
  DriverDocumentID,
  newDriverDocumentID
} from 'src/package/driver/domain/models/driver-document-id'
import {
  DriverID,
  newDriverID
} from 'src/package/driver/domain/models/driver-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Driver {
  id: DriverID
  userID: UserID
  documents: DriverDocumentID[]
}

export interface DriverProps {
  id: string
  userID: UserID
  documents: string[]
}

export const newDriver = ( props: DriverProps ): Driver => {
  return {
    id: newDriverID({
      value: props.id
    }),
    userID: props.userID,
    documents: props.documents.map( document => {
      return newDriverDocumentID({
        value: document
      })
    } )
  }
}
