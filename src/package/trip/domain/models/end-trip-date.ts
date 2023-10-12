import { z } from "zod";

export const EndTripDateSchema = z.object( {
  value : z.date(),
} ).transform( ( val, ctx ) => {
  val.value = new Date(val.value.getTime() + 12096e5)
  // if ( val.value < now || val.value > limitDate ) {
  //   ctx.addIssue( {
  //     code   : z.ZodIssueCode.custom,
  //     message: "Not a valid date",
  //   } );
  //   return z.NEVER;
  // }
  return val
})

type EndTripDateType = z.infer<typeof EndTripDateSchema>
export interface EndTripDate extends EndTripDateType{}

interface EndTripDateProps {
  value : Date
}

export const newEndTripDate = (props : EndTripDateProps): EndTripDate => {
  return EndTripDateSchema.parse( {
    value : props.value
  } )
}
