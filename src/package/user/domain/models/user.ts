import {
  newUserEmail,
  UserEmail
} from 'src/package/user/domain/models/user-email'
import {
  newUserID,
  UserID
} from 'src/package/user/domain/models/user-id'

export interface User {
  id: UserID
  email: UserEmail
}

export interface UserProps {
  id: string,
  email: string,
}

export const newUser = ( props: UserProps ): User => {
  return {
    id   : newUserID({
      value: props.id
    }),
    email: newUserEmail({
      value: props.email
    }),
  }
}
