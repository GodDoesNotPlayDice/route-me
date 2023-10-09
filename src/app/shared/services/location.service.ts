import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  Observable
} from 'rxjs'
import { startWatchLocation } from 'src/package/location-api/application/start-watch-location'
import { Position } from 'src/package/location-api/domain/models/position'
import { LocationRepository } from 'src/package/location-api/domain/repository/location-repository'

@Injectable( {
	providedIn: 'root'
} )
export class LocationService {
	constructor(
    private locationRepository: LocationRepository
  ) {
    startWatchLocation( this.locationRepository, ( position, err ) => {
			if ( err !== undefined ) {
				return
			}
			if ( !position ) {
				return
			}
			this.lastPosition = position
			this.newPosition.next( this.lastPosition )
		} )
	}

  lastPosition: Position | null

	private newPosition                                 = new BehaviorSubject<Position | null>(null)
	public newPosition$: Observable<Position | null> = this.newPosition.asObservable()
}
