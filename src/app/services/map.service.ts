import { Injectable } from '@angular/core'
import { environment } from '@env/environment'
import * as mapboxgl from 'mapbox-gl'
import { LocationService } from '.'

@Injectable( {
	providedIn: 'root'
} )
export class MapService {

	constructor(private location : LocationService) {}

	mapbox = ( mapboxgl as typeof mapboxgl )
	map : mapboxgl.Map | undefined
	style  = `mapbox://styles/mapbox/streets-v11`
	currentMarker: mapboxgl.Marker | undefined

	init( mapDivElement: HTMLDivElement ) {
		if(this.map){
			console.log("rem")
			this.map.remove()
		}
		this.mapbox.accessToken = environment.mapBoxApiKey
		this.map = new mapboxgl.Map( {
			// container: 'mapa-box',
			container: mapDivElement.id,
			style    : this.style,
			zoom     : 15,
			center   : [ -2.4125, 43.1746 ],
		} )
		this.map.addControl( new mapboxgl.NavigationControl() )

		this.map.on( 'click', ( e ) => {
			const lngLat = e.lngLat

			console.log( 'Clic en coordenadas:', lngLat )

			const marker = new mapboxgl.Marker( { color: 'red' } )
				.setLngLat( lngLat )
				.addTo( this.map! )
		} )

		this.location.newPosition$.subscribe(  async ( [lat, lng] ) => {
			await this.autoFollow( { lat: lat, lng: lng} )
		})
	}

	async autoFollow( center: { lat: number, lng: number } ) {
		if ( !this.map ) return
		this.map.panTo( { lat: center.lat, lng: center.lng } )
		if ( this.currentMarker !== undefined ) {
			this.currentMarker.remove()
		}
		this.currentMarker = new mapboxgl.Marker( { color: 'black' } )
			.setLngLat( [ center.lng, center.lat ] )
			.addTo( this.map )
	}
}
