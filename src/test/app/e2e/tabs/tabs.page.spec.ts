import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing'
import { TabsPage } from 'src/app/tabs/tabs.page'

describe( 'TabsPage', () => {
  let component: TabsPage
  let fixture: ComponentFixture<TabsPage>

  beforeEach( async () => {
    fixture   = TestBed.createComponent( TabsPage )
    component = fixture.componentInstance
    fixture.detectChanges()
  } )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )
