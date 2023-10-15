import { HttpClient } from '@angular/common/http'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { countryFromJson } from 'src/package/country-api/application/country-mapper'
import { CountryDao } from 'src/package/country-api/domain/dao/country-dao'
import { Country } from 'src/package/country-api/domain/models/country'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class CountryDaoRestCountries implements CountryDao {

  constructor( private http: HttpClient ) {}

  readonly url = 'https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2'

  async getAll(): Promise<Result<Country[], Error[]>> {
    const response = await this.http.get( this.url )
                               .toPromise()

    if ( response === undefined ) {
      return Err(
        [ new UnknownException( 'country dao. get all. rest countries' ) ] )
    }

    const errors: Error[]       = []
    const resultList: Country[] = []
    for ( const value of Object.values( response ) ) {
      const result = countryFromJson( value as Record<string, any> )

      if ( result.isErr() ) {
        errors.push( ...result.unwrapErr() )
      }
      resultList.push( result.unwrap() )
    }

    if ( errors.length > 0 ) {
      return Err( errors )
    }

    return Ok(resultList)
  }
}
