import {
	ComponentFixture,
	TestBed
} from '@angular/core/testing'
import { SearchPage } from 'src/app/tabs/search/search.page'

describe( 'SearchPage', () => {
	let component: SearchPage
	let fixture: ComponentFixture<SearchPage>

	beforeEach( async () => {
		fixture   = TestBed.createComponent( SearchPage )
		component = fixture.componentInstance
		fixture.detectChanges()
	} )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
