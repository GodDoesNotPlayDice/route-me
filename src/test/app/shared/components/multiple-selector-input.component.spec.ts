import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { MultipleSelectorInputComponent } from 'src/app/shared/components/multiple-selector-input/multiple-selector-input.component'

describe( 'MultipleSelectorInputComponent', () => {
  let component: MultipleSelectorInputComponent
  let fixture: ComponentFixture<MultipleSelectorInputComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ MultipleSelectorInputComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( MultipleSelectorInputComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
