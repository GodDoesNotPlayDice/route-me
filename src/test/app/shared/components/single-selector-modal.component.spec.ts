import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SingleSelectorModalComponent } from 'src/app/shared/components/single-selector-modal/single-selector-modal.component'

describe( 'SingleSelectorModalComponent', () => {
	let component: SingleSelectorModalComponent
	let fixture: ComponentFixture<SingleSelectorModalComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ SingleSelectorModalComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( SingleSelectorModalComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
