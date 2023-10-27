import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { preferenceFromJson } from 'src/package/preference/application/preference-mapper'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class PreferenceDaoApi implements PreferenceDao {

	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async getAll(): Promise<Result<Preference[], Error[]>> {
		const response = await this.http.get( this.url )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new ApiOperationException( 'preference api. get all' ) ] )
		}

		const errors: Error[]          = []
		const resultList: Preference[] = []
		for ( const value of Object.values( response ) ) {
			const result = preferenceFromJson( value as Record<string, any> )

			if ( result.isErr() ) {
				errors.push( ...result.unwrapErr() )
			}
			resultList.push( result.unwrap() )
		}

		if ( errors.length > 0 ) {
			return Err( errors )
		}

		return Ok( resultList )
	}

	async getById( id: PreferenceID ): Promise<Result<Preference, Error[]>> {
		const response = await this.http.get( this.url, {
			params: {
				id: id.value
			}
		} )
		                           .toPromise()

		if ( response === undefined ) {
			return Err( [ new ApiOperationException( 'preference api. get by id' ) ] )
		}

		const result = preferenceFromJson( response )

		if ( result.isErr() ) {
			return Err( result.unwrapErr() )
		}

		return Ok( result.unwrap() )
	}

}
