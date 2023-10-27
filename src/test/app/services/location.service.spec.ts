import { TestBed } from '@angular/core/testing'

import { PositionService } from 'src/app/shared/services/position.service'

describe( 'LocationService', () => {
	let service: PositionService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( PositionService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
