import { HttpClient } from '@angular/common/http'
import {
  Injectable
} from '@angular/core'
import { take } from 'rxjs'
import {
  Country,
  CountrySchema
} from 'src/app/shared/models/Country'
import { z } from 'zod'

@Injectable( {
  providedIn: 'root'
} )
export class CountryPhoneCodeService {

  readonly url = 'https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2'

  constructor( private http: HttpClient ) {
    this.http.get( this.url )
        .subscribe( ( res: any ) => {
          this.countriesList = z.array( CountrySchema )
                                .parse( res )
                                .sort( ( a, b ) => {
                                  if ( a.name.common > b.name.common ) {
                                    return 1
                                  }
                                  if ( a.name.common < b.name.common ) {
                                    return -1
                                  }
                                  return 0
                                } )
          console.log( 'countries ready' )
        } )
  }

  countriesList: Country[] = []
}
