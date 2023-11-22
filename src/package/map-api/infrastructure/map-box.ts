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
	 * Remove all markers in map
	 * @throws {MapNotFoundException} - if map not found
	 */
	async removeAllMarkersInMap( pageKey: string ): Promise<Result<boolean, Error>> {
		if ( !this.routeMarkers.has( pageKey ) ) {
			this.routeMarkers.set( pageKey, new Map() )
		}
		let pageMarkers = this.routeMarkers.get( pageKey )

		if ( pageMarkers === undefined ) {
			return Err( new MapNotFoundException() )
		}

		pageMarkers.forEach( ( value, key ) => {
			value.remove()
		} )
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
		center: Position, color: string,
		html ?: string,
		openFunction ?: ( toggleMarker: () => void ) => void ): Promise<Result<boolean, Error>> {

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

		if ( html !== undefined ) {
			newLocationMarker.setPopup(
				new mapboxgl.Popup( { offset: 25 } ).setHTML( html )
				                                    .on( 'open', () => {
					                                    openFunction?.( () => {
						                                    newLocationMarker.togglePopup()
					                                    } )
				                                    } )
			)
		}
		newLocationMarker.addTo( mapEntry )

		pageMarkers.set( locationKey, newLocationMarker )

		return Ok( true )
	}


	/**
	 * Add user marker
	 */
	async addUserMarker( pageKey: string,
		center: Position, color: string,
		html ?: string ): Promise<Result<boolean, Error>> {
		const mapEntry = this.maps.get( pageKey )

		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException() )
		}

		let userMark = this.userMarkers.get( pageKey )

		if ( userMark !== undefined ) {
			userMark.remove()
		}

		const newUserMark = new mapboxgl.Marker( { color: color } )
			.setLngLat( [ center.lng, center.lat ] )

		if ( html !== undefined ) {
			newUserMark.setPopup(
				new mapboxgl.Popup( { offset: 25 } )
					.setHTML( html )
			)
		}

		newUserMark.addTo( mapEntry )

		this.userMarkers.set( pageKey, newUserMark )
		return Ok( true )
	}

	/**
	 * Auto follow
	 * @throws {MarkerNotFoundException} - if marker not found
	 */
	async autoFollow( key: string,
		center: Position ): Promise<Result<boolean, Error>> {

		const mapEntry = this.maps.get( key )

		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException() )
		}
		mapEntry.panTo( { lat: center.lat, lng: center.lng } )

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

	async removeMap( key: string ): Promise<Result<boolean, Error>> {
		const mapEntry = this.maps.get( key )

		if ( mapEntry === undefined ) {
			return Err( new MapNotFoundException( 'entry' ) )
		}

		let userMark = this.userMarkers.get( key )

		if ( userMark === undefined ) {
			return Err( new MapNotFoundException( 'user mark' ) )
		}

		const routeMarkers = this.routeMarkers.get( key )

		if ( routeMarkers == undefined ) {
			return Err( new MapNotFoundException( 'route marks' ) )
		}

		mapEntry.remove()
		this.maps.delete( key )
		userMark.remove()
		this.userMarkers.delete( key )
		routeMarkers.forEach( ( value, key ) => {
			value.remove()
		} )
		this.routeMarkers.delete( key )
		return Ok( true )
	}
}
