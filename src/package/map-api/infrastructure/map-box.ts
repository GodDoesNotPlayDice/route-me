import { environment } from '@env/environment'
import * as mapboxgl from 'mapbox-gl'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Geometry } from 'src/package/direction-api/domain/models/geometry'
import { MapNotFoundException } from 'src/package/map-api/domain/exceptions/map-not-found-exception'
import { MarkerNotFoundException } from 'src/package/map-api/domain/exceptions/marker-not-found-exception'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'
import { Position } from 'src/package/position-api/domain/models/position'

export class MapBox extends MapRepository<mapboxgl.Map, mapboxgl.Marker> {
	/**
	 * Remove route map
	 * @throws {MapNotFoundException} - if map not found
	 */
	async removeRouteMap( pageKey: string ): Promise<Result<boolean, Error>> {
		const mapEntry = this.maps.get( pageKey )
		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException() )
		}

		const routeKey = `${ pageKey }-route`

		if ( mapEntry.isSourceLoaded( routeKey ) ) {
			mapEntry.removeLayer( routeKey )
			mapEntry.removeSource( routeKey )
		}

		return Ok( true )
	}

	/**
	 * Add route map
	 * @throws {MapNotFoundException} - if map not found
	 */
	async addRouteMap( pageKey: string,
		coordinates: Geometry ): Promise<Result<boolean, Error>> {
		const mapEntry = this.maps.get( pageKey )
		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException() )
		}
		const routeKey = `${ pageKey }-route`

		if ( mapEntry.isSourceLoaded( routeKey ) ) {
			mapEntry.removeLayer( routeKey )
			mapEntry.removeSource( routeKey )
		}

		mapEntry.addSource( routeKey, {
			type: 'geojson',
			data: {
				type      : 'Feature',
				properties: {},
				geometry  : {
					type       : 'LineString',
					coordinates: coordinates.values
				}
			}
		} )

		mapEntry.addLayer( {
			id    : routeKey,
			type  : 'line',
			source: routeKey,
			paint : {
				'line-color': 'black',
				'line-width': 3
			}
		} )

		return Ok( true )
	}

	/**
	 * Remove route marker
	 * @throws {MapNotFoundException} - if map not found
	 */
	async removeRouteMarker( pageKey: string,
		locationKey: string ): Promise<Result<boolean, Error>> {
		if ( !this.routeMarkers.has( pageKey ) ) {
			this.routeMarkers.set( pageKey, new Map() )
		}
		let pageMarkers = this.routeMarkers.get( pageKey )

		if ( pageMarkers === undefined ) {
			return Err( new MapNotFoundException() )
		}

		if ( pageMarkers.has( locationKey ) ) {
			pageMarkers.get( locationKey )!.remove()
		}

		return Ok( true )
	}

	/**
	 * Add route marker
	 * @throws {MapNotFoundException} - if map not found
	 * @throws {MarkerNotFoundException} - if marker not found
	 */
	async addRouteMarker( pageKey: string, locationKey: string,
		center: Position, color: string ): Promise<Result<boolean, Error>> {

		if ( !this.routeMarkers.has( pageKey ) ) {
			this.routeMarkers.set( pageKey, new Map() )
		}
		let pageMarkers = this.routeMarkers.get( pageKey )

		if ( pageMarkers === undefined ) {
			return Err( new MarkerNotFoundException() )
		}

		if ( pageMarkers.has( locationKey ) ) {
			pageMarkers.get( locationKey )!.remove()
		}

		const mapEntry = this.maps.get( pageKey )

		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException() )
		}

		const newLocationMarker = new mapboxgl.Marker( { color: color } )
			.setLngLat( [ center.lng, center.lat ] )
			.addTo( mapEntry )
		pageMarkers.set( locationKey, newLocationMarker )

		return Ok( true )
	}


	/**
	 * Add user marker
	 */
	async addUserMarker( pageKey: string,
		center: Position, map: mapboxgl.Map ): Promise<Result<boolean, Error>> {

		let userMark = this.userMarkers.get( pageKey )

		if ( userMark !== undefined ) {
			userMark.remove()
		}

		const newUserMark = new mapboxgl.Marker( { color: 'black' } )
			.setLngLat( [ center.lng, center.lat ] )
			.addTo( map )

		this.userMarkers.set( pageKey, newUserMark )
		return Ok( true )
	}

	/**
	 * Auto follow
	 * @throws {MarkerNotFoundException} - if marker not found
	 */
	async autoFollow( center: Position ): Promise<Result<boolean, Error>> {
		if ( this.userMarkers.size === 0 ) {
			return Err( new MarkerNotFoundException() )
		}
		for ( const [ keyEntry, mapEntry ] of this.maps ) {
			mapEntry.panTo( { lat: center.lat, lng: center.lng } )
			await this.addUserMarker( keyEntry, center, mapEntry )
		}
		return Ok( true )
	}

	/**
	 * Init map
	 * @throws {MapNotFoundException} - if map not found
	 */
	async init( key: string, divElement: HTMLDivElement,
		center: Position | null ): Promise<Result<mapboxgl.Map, Error>> {
		try {

			const map = new mapboxgl.Map( {
				container  : divElement.id,
				accessToken: environment.mapBoxApiKey,
				style      : 'mapbox://styles/mapbox/streets-v11',
				zoom       : 15,
				center     : center !== null ?
					[ center.lng, center.lat ]
					: [ -133.6242, -40.6294 ]
			} )
			this.maps.set( key, map )
			if ( center !== null ) {
				this.userMarkers.set( key, undefined )
			}
			return Ok( map )
		}
		catch ( e ) {
			return Err( new MapNotFoundException() )
		}
	}
}
