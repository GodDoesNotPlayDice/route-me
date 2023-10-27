import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { OutlinedButtonComponent } from 'src/app/shared/components/outlined-button/outlined-button.component'

describe( 'OutlinedButtonComponent', () => {
	let component: OutlinedButtonComponent
	let fixture: ComponentFixture<OutlinedButtonComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ OutlinedButtonComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( OutlinedButtonComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
