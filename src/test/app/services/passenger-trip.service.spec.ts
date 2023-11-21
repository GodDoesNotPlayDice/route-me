import { TestBed } from '@angular/core/testing'

import { PassengerTripService } from 'src/app/shared/services/passenger-trip.service'

describe( 'PassengerTripService', () => {
	let service: PassengerTripService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( PassengerTripService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
