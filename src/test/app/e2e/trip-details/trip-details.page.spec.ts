import {
	ComponentFixture,
	TestBed
} from '@angular/core/testing'
import { TripDetailsPage } from 'src/app/trip-details/trip-details.page'

describe( 'TripDetailsPage', () => {
	let component: TripDetailsPage
	let fixture: ComponentFixture<TripDetailsPage>

	beforeEach( async () => {
		fixture   = TestBed.createComponent( TripDetailsPage )
		component = fixture.componentInstance
		fixture.detectChanges()
	} )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
