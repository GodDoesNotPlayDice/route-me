import { TestBed } from '@angular/core/testing'

import { NearTripService } from 'src/app/shared/services/near-trip.service'

describe( 'NearTripService', () => {
	let service: NearTripService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( NearTripService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
