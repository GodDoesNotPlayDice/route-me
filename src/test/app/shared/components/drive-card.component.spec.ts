import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'

describe( 'DriveCardComponent', () => {
	let component: DriveCardComponent
	let fixture: ComponentFixture<DriveCardComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ DriveCardComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( DriveCardComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
