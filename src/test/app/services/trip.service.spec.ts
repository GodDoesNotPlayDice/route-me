import { TestBed } from '@angular/core/testing'

import { TripService } from 'src/app/shared/services/trip.service'

describe( 'TripService', () => {
	let service: TripService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( TripService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
