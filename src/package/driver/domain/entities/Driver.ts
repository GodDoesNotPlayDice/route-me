import { DriverID } from 'src/package/driver/domain/value-objects'
import { UserID } from 'src/package/user/domain'
import { DriverDocument } from '.'

export class Driver {
  private constructor(
    readonly id: DriverID,
    readonly userID: UserID,
    readonly documents: DriverDocument[]
  )
  {}

  static from(
    id: DriverID,
    userID: UserID,
    documents: DriverDocument[]
  ): Driver {
    return new Driver(
      id,
      userID,
      documents
    )
  }
}
