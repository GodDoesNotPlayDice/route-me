import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { CheckboxInputComponent } from 'src/app/shared/components/checkbox-input/checkbox-input.component'

describe( 'CheckboxInputComponent', () => {
	let component: CheckboxInputComponent
	let fixture: ComponentFixture<CheckboxInputComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ CheckboxInputComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( CheckboxInputComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
