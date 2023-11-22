import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SingleSelectorInputComponent } from 'src/app/shared/components/single-selector-input/single-selector-input.component'

describe( 'SingleSelectorInputComponent', () => {
	let component: SingleSelectorInputComponent
	let fixture: ComponentFixture<SingleSelectorInputComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ SingleSelectorInputComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( SingleSelectorInputComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
