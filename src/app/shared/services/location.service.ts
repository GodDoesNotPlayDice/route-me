import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  Observable
} from 'rxjs'
import { Position } from 'src/package/position-api/domain/models/position'
import { LocationRepository } from 'src/package/position-api/domain/repository/location-repository'

@Injectable( {
	providedIn: 'root'
} )
export class LocationService {
	constructor(
    private locationRepository: LocationRepository
  ) {
	this.locationRepository.requestPermissions()
    this.locationRepository.startWatch( ( position, err ) => {
      console.log('location service', position)
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
