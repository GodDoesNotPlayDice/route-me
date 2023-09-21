import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { UserPreferencesSelectorBarComponent } from 'src/app/shared/components/user-preferences-selector-bar/user-preferences-selector-bar.component'

describe( 'UserPreferencesSelectorBarComponent', () => {
  let component: UserPreferencesSelectorBarComponent
  let fixture: ComponentFixture<UserPreferencesSelectorBarComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ UserPreferencesSelectorBarComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( UserPreferencesSelectorBarComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
