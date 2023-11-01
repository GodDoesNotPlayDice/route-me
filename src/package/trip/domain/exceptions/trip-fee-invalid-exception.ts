export class TripFeeInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripFeeInvalidException'
	}
}
