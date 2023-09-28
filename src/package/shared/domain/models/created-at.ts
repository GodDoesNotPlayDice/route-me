import { z } from 'zod'

export const CreatedAtSchema = z.object( {
  value : z.date()
} ).superRefine( ( val, ctx ) => {
  const now          = new Date()
  const oneSecondAgo = new Date( now.getTime() - 1000 )
  if ( val.value < oneSecondAgo ) {
    ctx.addIssue( {
      code   : z.ZodIssueCode.custom,
      message: "Not a valid date",
    } );
    return z.NEVER;
  }
  return val
})

export type CreatedAt = z.infer<typeof CreatedAtSchema>

interface CreatedAtProps {
  value : Date
}

export const newCreatedAt = (props : CreatedAtProps): CreatedAt => {
  return CreatedAtSchema.parse( {
    value : props.value
  } )
}
