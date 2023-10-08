import { Injectable } from '@angular/core'
import {
	Geolocation,
	Position
} from '@capacitor/geolocation'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import { startWatchLocation } from 'src/package/location-api/application/start-watch-location'
import { LocationRepository } from 'src/package/location-api/domain/repository/location-repository'

@Injectable( {
	providedIn: 'root'
} )
export class LocationService {
	constructor(
    private loc: LocationRepository
  ) {

    startWatchLocation( this.loc, ( position, err ) => {
		// Geolocation.watchPosition( {}, ( position, err ) => {
			if ( err !== undefined ) {
				return
			}
			if ( !position ) {
				return
			}
      console.log( 'new position: ', position )
      //TODO: actualizar donde se utiliza con nuevo dominio de location
			// this.position = position
			// console.log( 'new position: ', this.position )
			// this.newPosition.next(
			// 	[ this.position.coords.latitude, this.position.coords.longitude ] )
		} )
	}

	position: Position | undefined

	private newPosition                                 = new BehaviorSubject<[ number, number ]>(
		[ 0, 0 ] )
	public newPosition$: Observable<[ number, number ]> = this.newPosition.asObservable()
}
