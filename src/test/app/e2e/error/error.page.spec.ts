import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing'
import { ErrorPage } from 'src/app/error/error.page'

describe( 'ErrorPage', () => {
  let component: ErrorPage
  let fixture: ComponentFixture<ErrorPage>

  beforeEach( async () => {
    fixture = TestBed.createComponent( ErrorPage )
    component = fixture.componentInstance
    fixture.detectChanges()
  } )

  it( 'should create', () => {
    expect( component )
      .toBeTruthy()
  } )
} )