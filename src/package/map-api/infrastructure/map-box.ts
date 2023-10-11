import { environment } from '@env/environment'
import * as mapboxgl from 'mapbox-gl'
import { Geometry } from 'src/package/direction-api/domain/models/geometry'
import { Position } from 'src/package/location-api/domain/models/position'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'

export class MapBox extends MapRepository<mapboxgl.Map, mapboxgl.Marker> {
  async removeRouteMap( pageKey: string ): Promise<void> {
    const mapEntry = this.maps.get( pageKey )
    if ( mapEntry === undefined ) {
      return
    }

    const routeKey = `${ pageKey }-route`

    if ( mapEntry.isSourceLoaded( routeKey ) ) {
      mapEntry.removeLayer( routeKey )
      mapEntry.removeSource( routeKey )
    }
  }

  async addRouteMap( pageKey: string, coordinates: Geometry ): Promise<void> {
    const mapEntry = this.maps.get( pageKey )
    if ( mapEntry === undefined ) {
      return
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
  }

  async removeRouteMarker(pageKey: string, locationKey: string): Promise<void> {
    if ( !this.routeMarkers.has( pageKey ) ) {
      this.routeMarkers.set( pageKey, new Map() )
    }
    let pageMarkers = this.routeMarkers.get( pageKey )!

    if ( pageMarkers.has( locationKey ) ) {
      pageMarkers.get( locationKey )!.remove()
    }
  }

  async addRouteMarker( pageKey: string, locationKey: string,
    center: Position, color: string ): Promise<void> {

    if ( !this.routeMarkers.has( pageKey ) ) {
      this.routeMarkers.set( pageKey, new Map() )
    }
    let pageMarkers = this.routeMarkers.get( pageKey )!

    if ( pageMarkers.has( locationKey ) ) {
      pageMarkers.get( locationKey )!.remove()
    }

    const mapEntry = this.maps.get( pageKey )

    if ( mapEntry === undefined ) {
      return
    }

    const newLocationMarker = new mapboxgl.Marker( { color: color } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( mapEntry )
    pageMarkers.set( locationKey, newLocationMarker )
  }

  async addUserMarker( pageKey: string,
    center: Position, map: mapboxgl.Map ): Promise<void> {

    let userMark = this.userMarkers.get( pageKey )

    if ( userMark !== undefined ) {
      userMark.remove()
    }

    const newUserMark = new mapboxgl.Marker( { color: 'black' } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( map )

    this.userMarkers.set( pageKey, newUserMark )
  }

  async autoFollow( center: Position ): Promise<void> {
    if ( this.userMarkers.size === 0 ) {
      return
    }
    for ( const [ keyEntry, mapEntry ] of this.maps ) {
      mapEntry.panTo( { lat: center.lat, lng: center.lng } )
      await this.addUserMarker( keyEntry, center, mapEntry )
    }
  }

  async init( key: string, divElement: HTMLDivElement,
    center: Position | null ): Promise<mapboxgl.Map> {
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
    return map
  }
}
