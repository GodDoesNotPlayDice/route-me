export class TripHistoryIdInvalidException extends Error {
	constructor( message?: string ) {
		super( message )
		this.name = 'TripHistoryIdInvalidException'
	}
}
