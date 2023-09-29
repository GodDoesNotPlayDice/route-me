import { z } from 'zod'

export const PassengerBirthDaySchema = z.object( {
  value : z.date()
} ).superRefine( ( val, ctx ) => {
		const currentDate = new Date()
		const date18years = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDay()
    )

    if ( val.value >= date18years ) {
      ctx.addIssue( {
        code   : z.ZodIssueCode.custom,
        message: "Not a valid date",
      } );
      return z.NEVER;
    }
  return val
})

type PassengerBirthDayType = z.infer<typeof PassengerBirthDaySchema>
export interface PassengerBirthDay extends PassengerBirthDayType {}

export interface PassengerBirthDayProps {
  value : Date
}

export const newPassengerBirthDay = (props : PassengerBirthDayProps): PassengerBirthDay => {
  return PassengerBirthDaySchema.parse( {
    value : props.value
  } )
}
