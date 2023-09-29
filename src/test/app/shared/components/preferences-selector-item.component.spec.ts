import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PreferencesSelectorItemComponent } from 'src/app/shared/components/preferences-selector-item/preferences-selector-item.component'

describe( 'UserPreferencesSelectorItemComponent', () => {
  let component: PreferencesSelectorItemComponent
  let fixture: ComponentFixture<PreferencesSelectorItemComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ PreferencesSelectorItemComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( PreferencesSelectorItemComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
