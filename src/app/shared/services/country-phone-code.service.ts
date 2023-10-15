import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  Observable
} from 'rxjs'
import { CountryDao } from 'src/package/country-api/domain/dao/country-dao'
import { Country } from 'src/package/country-api/domain/models/country'

@Injectable( {
  providedIn: 'root'
} )
export class CountryPhoneCodeService{


  constructor( private countryDao : CountryDao ) {}

  private countriesList                        = new BehaviorSubject<Country[]>(
    [] )
  public countriesList$: Observable<Country[]> = this.countriesList.asObservable()

  async init(): Promise<void> {
    const countriesResult = await this.countryDao.getAll()

    if ( countriesResult.isOk() ) {
      const list = countriesResult.unwrap().sort( ( a, b ) => {
        if ( a.name.common > b.name.common ) {
          return 1
        }
        if ( a.name.common < b.name.common ) {
          return -1
        }
        return 0
      } )
      this.countriesList.next( list )
      console.log('country ready')
    }
  }
}
