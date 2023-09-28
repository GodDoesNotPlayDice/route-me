import { CreatedAtSchema } from 'src/package/shared/domain/models/created-at'
import { z } from 'zod'

// export const UpdatedAtSchema = z.object( {
// 	value: z.date()
// } )

export const UpdatedAtSchema = z.object( {
  value : z.date(),
  createdAt: z.date()
} ).superRefine( ( val, ctx ) => {
  if ( val.value < val.createdAt ) {
    ctx.addIssue( {
      code   : z.ZodIssueCode.custom,
      message: "Not a valid date",
    } );
    return z.NEVER;
  }
  return val
})

export type UpdatedAt = z.infer<typeof UpdatedAtSchema>

interface UpdatedAtProps {
	value: Date,
	createdAt: Date
}

export const newUpdatedAt = ( props: UpdatedAtProps ): UpdatedAt => {
	return UpdatedAtSchema.parse( {
		value: props.value,
    createdAt: props.createdAt
	} )
}
