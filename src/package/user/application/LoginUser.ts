import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  AuthRepository,
  User,
  UserEmail,
  UserPassword
} from 'src/package/user/domain'

export class LoginUser {
  constructor(private repository : AuthRepository) {
  }

  async execute(email : UserEmail, password: UserPassword): Promise<Result<User, string>>{

    const result = await this.repository.login(
      email,
      password
    )
    if (result.isErr()){
      return Promise.resolve(Err(result.unwrapErr()));
    }
    return Promise.resolve(Ok(result.unwrap()));
  }
}
