import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  Observable,
  take
} from 'rxjs'
import { countryFromJson } from 'src/package/country-api/application/country-mapper'
import { Country } from 'src/package/country-api/domain/models/country'

@Injectable( {
  providedIn: 'root'
} )
export class CountryPhoneCodeService {

  readonly url = 'https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2'

  constructor( private http: HttpClient ) {
    this.http.get( this.url )
        .pipe( take( 1 ) )
        .subscribe( ( res: any ) => {
          let list: Country[] = []
          for ( const value of Object.values( res ) ) {
            const c = countryFromJson( value as Record<string, any> )
            if ( c.isErr() ) {
              continue
            }
            list.push( c.unwrap() )
          }
          list = list.sort( ( a, b ) => {
            if ( a.name.common > b.name.common ) {
              return 1
            }
            if ( a.name.common < b.name.common ) {
              return -1
            }
            return 0
          } )
          this.countriesList.next( list )
          console.log( 'countries ready' )
        } )
  }

  private countriesList                        = new BehaviorSubject<Country[]>(
    [] )
  public countriesList$: Observable<Country[]> = this.countriesList.asObservable()
}
