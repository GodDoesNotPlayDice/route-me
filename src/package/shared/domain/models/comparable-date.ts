import { z } from 'zod'

export enum ComparatorEnum {
	After   = 'After',
	Before = 'Before',
}

export const ComparatorEnumSchema = z.nativeEnum( ComparatorEnum )

export type Comparator = z.infer<typeof ComparatorEnumSchema>

interface ComparatorProps {
	value: string
}

export const newComparator = ( props: ComparatorProps ): Comparator => {
	return ComparatorEnumSchema.parse( props.value )
}

export const ComparableDateSchema = z.object( {
	value : z.date(),
	otherDate : z.date(),
	comparator : ComparatorEnumSchema,
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
// ComparableDate, value, otherDate, comparator-type
// ComparableDate, 10/10, 24/10, after - check
// ComparableDate, 24/10, 10/10, before - check

type ComparableDateType = z.infer<typeof ComparableDateSchema>
export interface ComparableDate extends ComparableDateType{}

interface ComparableDateProps {
	value : Date
	otherDate : Date,
	comparator : Comparator,
}

export const newComparableDate = (props : ComparableDateProps): ComparableDate => {
	return ComparableDateSchema.parse( {
		value : props.value,
		otherDate : props.otherDate,
		comparator : props.comparator,
	} )
}
