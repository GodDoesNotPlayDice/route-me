import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { z } from 'zod'
import {
  InvalidDateUserException,
  UnknowException
} from './exceptions'

export const MyUserSchema = z.object( {
  user: z.string(),
  date: z.date(),
  num : z.number()
} )

type MyUserType = z.infer<typeof MyUserSchema>

export interface MyUser extends MyUserType {}

type FlattenedErrors = z.inferFlattenedErrors<typeof MyUserSchema>;

interface MyUserProps {
  user: string
  date: Date
  num: number
}

/**
 * caso 1 - value object
 * @throws {InvalidDateUserException} invalid date
 */
export const newMyUserC1 = ( props: MyUserProps ): Result<MyUser, Error[]> => {
  const userResult = MyUserSchema.safeParse( {
      user: props.user,
      date: props.date,
      num : props.num,
    }
  )

  if ( !userResult.success ) {
    const err: Error[] = []
    const zodErrors = userResult.error.errors.map( e => e.message )
    for ( const msg of zodErrors ) {
      if ( msg === 'Invalid date' ){
        err.push( new InvalidDateUserException(msg) )
      }
      else {
        err.push( new UnknowException(msg) )
      }
    }
    return Err( err )
  }
  else {
    return Ok( userResult.data )
  }
}
