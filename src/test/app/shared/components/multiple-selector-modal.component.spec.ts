import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { MultipleSelectorModalComponent } from 'src/app/shared/components/multiple-selector-modal/multiple-selector-modal.component'

describe( 'MultipleSelectorModalComponent', () => {
	let component: MultipleSelectorModalComponent
	let fixture: ComponentFixture<MultipleSelectorModalComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ MultipleSelectorModalComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( MultipleSelectorModalComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
