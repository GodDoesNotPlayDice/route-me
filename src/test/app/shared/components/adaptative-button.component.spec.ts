import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AdaptativeButtonComponent } from 'src/app/shared/components/adaptative-button/adaptative-button.component'

describe( 'AdaptativeButtonComponent', () => {
  let component: AdaptativeButtonComponent
  let fixture: ComponentFixture<AdaptativeButtonComponent>

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      declarations: [ AdaptativeButtonComponent ],
      imports     : [ IonicModule.forRoot() ]
    } )
           .compileComponents()

    fixture   = TestBed.createComponent( AdaptativeButtonComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } ) )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
