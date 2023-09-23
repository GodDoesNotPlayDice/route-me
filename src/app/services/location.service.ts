import { Injectable } from '@angular/core'
import {
	Geolocation,
	Position
} from '@capacitor/geolocation'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'

@Injectable( {
	providedIn: 'root'
} )
export class LocationService {
	constructor() {
		Geolocation.requestPermissions()

		Geolocation.watchPosition( {}, ( position, err ) => {
			if ( err !== undefined ) {
				return
			}
			if ( !position ) {
				return
			}
			this.position = position
			console.log( 'new position: ', this.position )
			this.newPosition.next(
				[ this.position.coords.latitude, this.position.coords.longitude ] )
		} )
	}

	position: Position | undefined

	private newPosition                                 = new BehaviorSubject<[ number, number ]>(
		[ 0, 0 ] )
	public newPosition$: Observable<[ number, number ]> = this.newPosition.asObservable()
}
