import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { ComparatorInvalidException } from 'src/package/shared/domain/exceptions/comparator-invalid-exception'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export enum ComparatorEnum {
  After  = 'After',
  Before = 'Before',
}

export const ComparatorEnumSchema = z.nativeEnum( ComparatorEnum )

export type Comparator = z.infer<typeof ComparatorEnumSchema>

interface ComparatorProps {
  value: string
}

export const newComparator = ( props: ComparatorProps ): Result<Comparator, Error> => {
  const result = ComparatorEnumSchema.safeParse( props.value )

  if ( !result.success ) {
    return Err( new ComparatorInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}

export const ComparableDateSchema = z.object( {
  value     : z.date(),
  otherDate : z.date(),
  comparator: ComparatorEnumSchema
} )
                                     .superRefine( ( val, ctx ) => {
                                       switch ( val.comparator ) {
                                         case 'Before':
                                           if ( val.otherDate > val.value ) {
                                             ctx.addIssue( {
                                               code   : z.ZodIssueCode.custom,
                                               message: 'Other date is greater than value'
                                             } )
                                             return z.NEVER
                                           }
                                           break
                                         case 'After':
                                           if ( val.value > val.otherDate ) {
                                             ctx.addIssue( {
                                               code   : z.ZodIssueCode.custom,
                                               message: 'Value is greater than other date'
                                             } )
                                             return z.NEVER
                                           }
                                           break
                                       }
                                       return val
                                     } )

type ComparableDateType = z.infer<typeof ComparableDateSchema>

export interface ComparableDate extends ComparableDateType {}

interface ComparableDateProps {
  value: Date
  otherDate: Date,
  comparator: Comparator,
}

/**
 * Create a comparable date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newComparableDate = ( props: ComparableDateProps ): Result<ComparableDate, Error> => {
  const result = ComparableDateSchema.safeParse( {
    value     : props.value,
    otherDate : props.otherDate,
    comparator: props.comparator
  } )

  if ( !result.success ) {
    return Err( new DateInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
