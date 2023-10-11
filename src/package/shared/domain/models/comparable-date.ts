import { LimitDateSchema } from 'src/package/shared/domain/models/limit-date'
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
	switch ( val.comparator ) {
		case "Before":
			if ( val.otherDate > val.value ) {
				ctx.addIssue( {
					code   : z.ZodIssueCode.custom,
					message: "Other date is greater than value",
				} )
				return z.NEVER
			}
			break
		case "After":
			if ( val.value > val.otherDate ) {
				ctx.addIssue( {
					code   : z.ZodIssueCode.custom,
					message: "Value is greater than other date",
				} )
				return z.NEVER
			}
			break
	}
	return val
})

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
