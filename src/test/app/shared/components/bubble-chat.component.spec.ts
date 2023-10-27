import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { BubbleChatComponent } from 'src/app/shared/components/bubble-chat/bubble-chat.component'

describe( 'BubbleChatComponent', () => {
	let component: BubbleChatComponent
	let fixture: ComponentFixture<BubbleChatComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ BubbleChatComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( BubbleChatComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )
} )
