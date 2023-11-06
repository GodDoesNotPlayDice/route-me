import { Injectable } from '@angular/core'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'

@Injectable( {
	providedIn: 'root'
} )
export class PreferenceService {

	constructor( private preferenceDao: PreferenceDao ) {}

	preferences: Preference[] = []

	async getPreferences(): Promise<Preference[]> {
		if ( this.preferences.length > 0 ) {
			return this.preferences
		}
		const result = await this.preferenceDao.getAll()
		if ( result.isErr() ) {
			console.log( 'error get all preferences' )
			console.log( result.unwrapErr() )
			return []
		}
		this.preferences = result.unwrap()
		if ( this.preferences.length > 0 ) {
			console.log( 'preferences ready' )
		}
		else {
			console.log( 'preferences empty' )
		}
		return this.preferences
	}
}
