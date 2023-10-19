import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { DateTimeSelectorComponent } from 'src/app/shared/components/date-time-selector/date-time-selector.component'

describe( 'DateTimeSelectorComponent', () => {
  let component: DateTimeSelectorComponent
  let fixture: ComponentFixture<DateTimeSelectorComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ DateTimeSelectorComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( DateTimeSelectorComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
