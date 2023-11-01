import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class PreferenceDaoApi implements PreferenceDao {

	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async create( preference: Preference ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException( 'preference create api' ) ] )
	}

	async getAll(): Promise<Result<Preference[], Error[]>> {
		return Err( [ new ApiOperationException( 'preference get all api' ) ] )
	}
}
