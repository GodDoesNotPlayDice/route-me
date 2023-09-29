import {
  newUserEmail,
  newUserID,
  UserEmail,
  UserID
} from 'src/package/user/domain/models'

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
