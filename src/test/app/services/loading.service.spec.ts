import { TestBed } from '@angular/core/testing'

import { LoadingService } from 'src/app/shared/services/loading.service'

describe( 'LoadingService', () => {
	let service: LoadingService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( LoadingService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
