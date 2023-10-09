import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { Position } from 'src/package/location-api/domain/models/position'

@Injectable( {
	providedIn: 'root'
} )
export class DirectionService {

	constructor( private http: HttpClient ) { }

	async getDirection( inicio: Position,
		final: Position ): Promise<Option<object>> {
		const start    = `${ inicio.lng },${ inicio.lat }`
		const end      = `${ final.lng },${ final.lat }`
		const response = await this.http.get(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${ start };${ end }?alternatives=true&geometries=geojson&overview=simplified&steps=false&access_token=${ environment.mapBoxApiKey }` )
		                           .toPromise()
		if ( response === undefined ) {
			return None
		}
		else {
			return Some( response )
		}
	}
}
