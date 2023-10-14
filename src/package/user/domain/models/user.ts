import { UserEmail } from 'src/package/user/domain/models/user-email'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface User {
  id: UserID
  email: UserEmail
}
