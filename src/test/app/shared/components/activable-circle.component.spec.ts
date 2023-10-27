import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ActivableCircleComponent } from 'src/app/shared/components/activable-circle/activable-circle.component'

describe( 'ActivableCircleComponent', () => {
	let component: ActivableCircleComponent
	let fixture: ComponentFixture<ActivableCircleComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ ActivableCircleComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( ActivableCircleComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
