import { TestBed } from '@angular/core/testing'

import { TripHistoryService } from 'src/app/shared/services/trip-history.service'

describe( 'TripHistoryService', () => {
	let service: TripHistoryService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( TripHistoryService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
