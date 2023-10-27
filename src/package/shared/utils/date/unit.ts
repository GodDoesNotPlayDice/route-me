export enum UnitEnum {
	Days    = 'Days',
	Hours   = 'Hours',
	Minutes = 'Minutes',
	Seconds = 'Seconds'
}

export type Unit = UnitEnum

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
