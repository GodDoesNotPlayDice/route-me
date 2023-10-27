import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { MultipleSelectorItemComponent } from 'src/app/shared/components/multiple-selector-item/multiple-selector-item.component'

describe( 'MultipleSelectorItemComponent', () => {
	let component: MultipleSelectorItemComponent
	let fixture: ComponentFixture<MultipleSelectorItemComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ MultipleSelectorItemComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( MultipleSelectorItemComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
