import { TestBed } from '@angular/core/testing'

import { CountryPhoneCodeService } from 'src/app/shared/services/country-phone-code.service'

describe( 'CountryPhoneCodeService', () => {
	let service: CountryPhoneCodeService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( CountryPhoneCodeService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
