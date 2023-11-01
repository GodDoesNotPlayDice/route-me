import { TestBed } from '@angular/core/testing'

import { PreferenceService } from 'src/app/shared/services/preference.service'

describe( 'UserPreferenceService', () => {
	let service: PreferenceService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( PreferenceService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
