import { TestBed } from '@angular/core/testing'

import { DriverCarService } from 'src/app/shared/services/driver-car.service'

describe( 'DriverCarService', () => {
	let service: DriverCarService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( DriverCarService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
