import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { take } from 'rxjs'
import {
  Country,
  countryFromJson,
  newCountry
} from 'src/app/shared/models'

@Injectable( {
  providedIn: 'root'
} )
export class CountryPhoneCodeService {

  readonly url = 'https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2'

  constructor( private http: HttpClient ) {
    this.http.get( this.url )
        .pipe(take(1))
        .subscribe( ( res: any ) => {
          this.countriesList = Object.values(res).map((country: any) => {
            const c = countryFromJson(country)
            if (c.isNone()) {
              return newCountry({})
            }
            return c.unwrap()
          }).sort( ( a, b ) => {
            if ( a.name.common > b.name.common ) {
              return 1
            }
            if ( a.name.common < b.name.common ) {
              return -1
            }
            return 0
          })
          console.log( 'countries ready' )
        } )
  }

  countriesList: Country[] = []
}
