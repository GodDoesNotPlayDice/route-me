import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'

describe( 'SearchBarComponent', () => {
	let component: SearchLauncherComponent
	let fixture: ComponentFixture<SearchLauncherComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ SearchLauncherComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( SearchLauncherComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
