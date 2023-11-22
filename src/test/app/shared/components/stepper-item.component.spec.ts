import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { StepperItemComponent } from 'src/app/shared/components/stepper-item/stepper-item.component'

describe( 'StepperItemComponent', () => {
	let component: StepperItemComponent
	let fixture: ComponentFixture<StepperItemComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ StepperItemComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( StepperItemComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
