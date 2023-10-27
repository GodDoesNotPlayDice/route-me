import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AppBarCloneComponent } from 'src/app/shared/components/app-bar-clone/app-bar-clone.component'

describe( 'AppBarCloneComponent', () => {
	let component: AppBarCloneComponent
	let fixture: ComponentFixture<AppBarCloneComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ AppBarCloneComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( AppBarCloneComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
