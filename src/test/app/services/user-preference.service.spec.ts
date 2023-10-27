import { TestBed } from '@angular/core/testing'

import { UserPreferenceService } from 'src/app/shared/services/user-preference.service'

describe( 'UserPreferenceService', () => {
	let service: UserPreferenceService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( UserPreferenceService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
