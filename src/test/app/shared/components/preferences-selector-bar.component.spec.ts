import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PreferencesSelectorBarComponent } from 'src/app/shared/components/preferences-selector-bar/preferences-selector-bar.component'

describe( 'UserPreferencesSelectorBarComponent', () => {
  let component: PreferencesSelectorBarComponent
  let fixture: ComponentFixture<PreferencesSelectorBarComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ PreferencesSelectorBarComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( PreferencesSelectorBarComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
