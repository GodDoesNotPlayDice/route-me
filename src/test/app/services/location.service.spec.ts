import { TestBed } from '@angular/core/testing'

import { LocationService } from 'src/app/shared/services/location.service'

describe( 'LocationService', () => {
  let service: LocationService

  beforeEach( () => {
    TestBed.configureTestingModule( {} )
    service = TestBed.inject( LocationService )
  } )

  it( 'should be created', () => {
    expect( service )
      .toBeTruthy()
  } )
} )
