import { TestBed } from '@angular/core/testing'

import { DriverService } from 'src/app/shared/services/driver.service'

describe( 'DriversService', () => {
  let service: DriverService

  beforeEach( () => {
    TestBed.configureTestingModule( {} )
    service = TestBed.inject( DriverService )
  } )

  it( 'should be created', () => {
    expect( service )
      .toBeTruthy()
  } )
} )
