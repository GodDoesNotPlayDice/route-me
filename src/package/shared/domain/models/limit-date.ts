import { z } from "zod";

export const LimitDateSchema = z.object( {
	value : z.date(),
} ).superRefine( ( val, ctx ) => {
	const now          = new Date()
	const oneSecondAgo = new Date( now.getTime() - 1000 )
	// const we = new Date(val.value.getTime() + 12096e5)

	if ( val.value < oneSecondAgo ) {
		ctx.addIssue( {
			code   : z.ZodIssueCode.custom,
			message: "Not a valid date",
		} );
		return z.NEVER;
	}
	return val
})

type LimitDateType = z.infer<typeof LimitDateSchema>
export interface LimitDate extends LimitDateType{}

interface LimitDateProps {
	value : Date
}

export const newLimitDate = (props : LimitDateProps): LimitDate => {
	return LimitDateSchema.parse( {
		value : props.value,
	} )
}
