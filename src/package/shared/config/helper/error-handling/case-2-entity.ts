import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  InvalidDateUserException,
  MyUserException,
  UnknowException
} from 'src/package/shared/config/helper/error-handling/exceptions'
import { z } from 'zod'

export const ValidDateSchema = z.object( {
  value: z.date()
} )

type ValidDateType = z.infer<typeof ValidDateSchema>

export interface ValidDate extends ValidDateType {}

interface ValidDateProps {
  date: Date
}

export const newValidDateC2 = ( props: ValidDateProps ): Result<ValidDate, Error[]> => {
  const validDateResult = ValidDateSchema.safeParse( {
      value: props.date
    }
  )

  if ( !validDateResult.success ) {
    const err: Error[] = []
    const zodErrors = validDateResult.error.errors.map( e => e.message )
    for ( const msg of zodErrors ) {
      if ( msg === 'Invalid date' ) {
        err.push( new InvalidDateUserException( msg ) )
      }
      else {
        err.push( new UnknowException( msg ) )
      }
    }
    return Err( err )
  }
  else {
    return Ok( validDateResult.data )
  }
}

export interface MyNewDate {
  date: Date
  to: ValidDate
  pass: ValidDate
}

interface MyNewDateProps {
  date: Date
  to: Date
  pass: ValidDate
}

// caso 2 - entity
export const newMyNewDateC2 = ( props: MyNewDateProps ): Result<MyNewDate, MyUserException[]> => {
  const dateResult = z.date().safeParse( props.date )

  const err: Error[] = []

  const validDateResult = newValidDateC2( { date: props.to } )

  if ( validDateResult.isErr() ) {
    err.push( ...validDateResult.unwrapErr() )
  }

  if ( !dateResult.success ) {
    const zodErrors = dateResult.error.errors.map( e => e.message )
    for ( const msg of zodErrors ) {
        err.push( new UnknowException( msg ) )
      // if ( msg === 'Invalid date' ) {
      //   err.push( new InvalidDateUserException( msg ) )
      // }
      // else {
      //   err.push( new UnknowException( msg ) )
      // }
    }
    return Err( err )
  }
  else if ( err.length > 0 ) {
    return Err( err )
  }
  else {
    return Ok( {
      date: dateResult.data,
      to  : validDateResult.unwrap(),
      pass: props.pass
    } )
  }
}
