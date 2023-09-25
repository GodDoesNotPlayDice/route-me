import {
  Injectable,
  OnDestroy
} from '@angular/core'
import { environment } from '@env/environment'
import * as mapboxgl from 'mapbox-gl'
import { Subscription } from 'rxjs'
import { LocationService } from '.'

@Injectable( {
  providedIn: 'root'
} )
export class MapService implements OnDestroy {
  constructor( private location: LocationService ) {
    this.mapbox.accessToken = environment.mapBoxApiKey
    this.locationSub        =
      this.location.newPosition$.subscribe( async ( [ lat, lng ] ) => {
        await this.autoFollow( { lat: lat, lng: lng } )
      } )
  }

  public ngOnDestroy(): void {
    console.log( 'me destruyo' )
    this.locationSub.unsubscribe()
  }

  locationSub: Subscription
  mapbox                                                = ( mapboxgl as typeof mapboxgl )
  map: Map<string, mapboxgl.Map>                        = new Map()
  style                                                 = `mapbox://styles/mapbox/streets-v11`
  userMarkers: Map<string, mapboxgl.Marker | undefined> = new Map()

  async init( key: string, divElement: HTMLDivElement ) {
    if ( this.location.position !== undefined ) {
      await this.autoFollow( {
        lat: this.location.position.coords.latitude,
        lng: this.location.position.coords.longitude
      } )
    }
    const pos = this.location.position !== undefined
      ? {
        coords: {
          latitude : this.location.position.coords.latitude,
          longitude: this.location.position.coords.longitude
        }
      }
      : { coords: { latitude: 43.1746, longitude: -2.4125 } }
    this.map.set( key, new mapboxgl.Map( {
      container: divElement.id,
      style    : this.style,
      zoom     : 15,
      center   : [ pos.coords.longitude, pos.coords.latitude ]
    } ) )

    const mapEntry = this.map.get( key )!

    if ( this.location.position !== undefined ) {
      this.addMarker( key, {
        lat: this.location.position.coords.latitude,
        lng: this.location.position.coords.longitude
      }, mapEntry )
    }
    else {
      this.userMarkers.set( key, undefined )

    }

    mapEntry.addControl( new mapboxgl.NavigationControl() )

    mapEntry.on( 'click', ( e ) => {
      const lngLat = e.lngLat

      console.log( 'Clic en coordenadas:', lngLat )

      const marker = new mapboxgl.Marker( { color: 'red' } )
        .setLngLat( lngLat )
        .addTo( mapEntry )
    } )
  }

  async autoFollow( center: { lat: number, lng: number } ) {
    if ( this.userMarkers.size === 0 ) {
      return
    }
    for ( const [ keyEntry, mapEntry ] of this.map ) {
      mapEntry.panTo( { lat: center.lat, lng: center.lng } )
      this.addMarker( keyEntry, center, mapEntry )
    }
  }

  private addMarker( keyEntry: string, center: { lat: number; lng: number },
    mapEntry: mapboxgl.Map ): void {
    let userMark = this.userMarkers.get( keyEntry )

    if ( userMark !== undefined ) {
      userMark.remove()
    }
    userMark = new mapboxgl.Marker( { color: 'black' } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( mapEntry )
  }
}
