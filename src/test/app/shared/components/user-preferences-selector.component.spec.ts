import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { UserPreferencesSelectorComponent } from 'src/app/shared/components/user-preferences-selector/user-preferences-selector.component'

describe( 'UserPreferencesSelectorComponent', () => {
  let component: UserPreferencesSelectorComponent
  let fixture: ComponentFixture<UserPreferencesSelectorComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ UserPreferencesSelectorComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( UserPreferencesSelectorComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
