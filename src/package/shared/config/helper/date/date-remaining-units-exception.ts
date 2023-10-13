export class DateRemainingUnitsException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'DateRemainingUnitsException'
	}
}
