import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PreferencesSelectorComponent } from 'src/app/shared/components/preferences-selector/preferences-selector.component'

describe( 'UserPreferencesSelectorComponent', () => {
  let component: PreferencesSelectorComponent
  let fixture: ComponentFixture<PreferencesSelectorComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ PreferencesSelectorComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( PreferencesSelectorComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
