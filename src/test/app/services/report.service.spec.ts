import { TestBed } from '@angular/core/testing'

import { ReportService } from 'src/app/shared/services/report.service'

describe( 'ReportService', () => {
	let service: ReportService

	beforeEach( () => {
		TestBed.configureTestingModule( {} )
		service = TestBed.inject( ReportService )
	} )

	it( 'should be created', () => {
		expect( service )
			.toBeTruthy()
	} )
} )
