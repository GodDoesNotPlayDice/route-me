import { Email } from 'src/package/shared/domain/models/email'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface User {
	id: UserID
	email: Email
}
