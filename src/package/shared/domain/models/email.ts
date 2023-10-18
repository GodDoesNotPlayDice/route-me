import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { EmailInvalidException } from 'src/package/shared/domain/exceptions/email-invalid-exception'
import { z } from 'zod'

export const EmailSchema = z.object( {
  value: z.string()
          .email()
} )

type EmailType = z.infer<typeof EmailSchema>

export interface Email extends EmailType {}

interface EmailProps {
  value: string
}

/**
 * Create a user email instance
 * @throws {EmailInvalidException} - if email is invalid
 */
export const newEmail = ( props: EmailProps ): Result<Email, Error> => {
  const result = EmailSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new EmailInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
