import { TestBed } from '@angular/core/testing'

import { MapService } from 'src/app/shared/services/map.service'

describe( 'MapService', () => {
	let service: MapService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( MapService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
