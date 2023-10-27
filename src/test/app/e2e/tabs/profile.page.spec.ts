import {
	ComponentFixture,
	TestBed
} from '@angular/core/testing'
import { ProfilePage } from 'src/app/tabs/profile/profile.page'

describe( 'ProfilePage', () => {
	let component: ProfilePage
	let fixture: ComponentFixture<ProfilePage>

	beforeEach( async () => {
		fixture   = TestBed.createComponent( ProfilePage )
		component = fixture.componentInstance
		fixture.detectChanges()
	} )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
