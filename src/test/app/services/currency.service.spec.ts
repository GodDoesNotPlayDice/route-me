import { TestBed } from '@angular/core/testing'

import { CurrencyService } from 'src/app/shared/services/currency.service'

describe( 'CurrencyService', () => {
	let service: CurrencyService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( CurrencyService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
