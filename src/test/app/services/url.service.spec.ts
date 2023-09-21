import { TestBed } from '@angular/core/testing'

import { UrlService } from 'src/app/services/url/url.service'

describe( 'UrlService', () => {
  let service: UrlService

  beforeEach( () => {
    TestBed.configureTestingModule( {} )
    service = TestBed.inject( UrlService )
  } )

  it( 'should be created', () => {
    expect( service )
      .toBeTruthy()
  } )
} )
