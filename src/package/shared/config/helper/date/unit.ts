export enum UnitEnum {
  Days   = 'Days',
  Hours = 'Hours',
  Minutes   = 'Minutes',
  Seconds   = 'Seconds'
}

export type Unit = UnitEnum
// export const UnitEnumSchema = z.nativeEnum( UnitEnum )
// export type Unit = z.infer<typeof UnitEnumSchema>
// interface UnitProps {
//   value: string
// }
// export const newUnit = ( props: UnitProps ): Unit => {
//   return UnitEnumSchema.parse( props.value )
// }

export interface UnitText {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export interface RemainingUnits {
  days: number
  hours: number
  minutes: number
  seconds: number
}
