import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { PasswordInsufficientCharacterException } from 'src/package/user/domain/exceptions/password-insufficient-character-exception'
import { PasswordInsufficientLengthException } from 'src/package/user/domain/exceptions/password-insufficient-length-exception'
import { PasswordInsufficientLowercaseException } from 'src/package/user/domain/exceptions/password-insufficient-lowercase-exception'
import { PasswordInsufficientNumberException } from 'src/package/user/domain/exceptions/password-insufficient-number-exception'
import { PasswordInsufficientUppercaseException } from 'src/package/user/domain/exceptions/password-insufficient-uppercase-exception'
import { z } from 'zod'

export const UserPasswordSchema = z.object( {
  value: z.string()
          .min( 8 )
          .regex( RegExp( /^(?=.*[a-z]).*$/ ), { message: 'lowercase' } )
          .regex( RegExp( /^(?=.*[A-Z]).*$/ ), { message: 'uppercase' } )
          .regex( RegExp( /^(?=.*\d).*$/ ), { message: 'number' } )
          .regex( RegExp( /^(?=.*[$@!*?&]).*$/ ), { message: 'character' } )
  // .regex(RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!*?&]).{8,}.*$/))
} )

type UserPasswordType = z.infer<typeof UserPasswordSchema>

export interface UserPassword extends UserPasswordType {}

interface UserPasswordProps {
  value: string
}

/**
 * Create a user password instance
 * @throws {PasswordInsufficientLengthException} - if password length is invalid
 * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
 * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
 * @throws {PasswordInsufficientNumberException} - if password number is invalid
 * @throws {PasswordInsufficientCharacterException} - if password character is invalid
 */
export const newUserPassword = ( props: UserPasswordProps ): Result<UserPassword, Error[]> => {
  const result = UserPasswordSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    const err: Error[] = []
    for ( let e of result.error.errors ) {
      if ( e.message === 'lowercase' ) {
        err.push( new PasswordInsufficientLowercaseException() )
      }
      else if ( e.message === 'uppercase' ) {
        err.push( new PasswordInsufficientUppercaseException() )
      }
      else if ( e.message === 'number' ) {
        err.push( new PasswordInsufficientNumberException() )
      }
      else if ( e.message === 'character' ) {
        err.push( new PasswordInsufficientCharacterException() )
      }
      else if ( e.code === 'too_small' ) {
        err.push(
          new PasswordInsufficientLengthException( String( e.minimum ) ) )
      }
      else {
        err.push( new UnknownException( 'password creation' ) )
      }
    }
    return Err( err )
  }
  else {
    return Ok( result.data )
  }
}
