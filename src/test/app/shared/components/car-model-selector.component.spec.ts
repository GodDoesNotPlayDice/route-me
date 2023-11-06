import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { CarModelSelectorComponent } from 'src/app/shared/components/car-model-selector/car-model-selector.component'

describe( 'CarModelSelectorComponent', () => {
	let component: CarModelSelectorComponent
	let fixture: ComponentFixture<CarModelSelectorComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ CarModelSelectorComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture = TestBed.createComponent( CarModelSelectorComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
