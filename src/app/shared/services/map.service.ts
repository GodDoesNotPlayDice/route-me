import {
  Injectable,
  OnDestroy
} from '@angular/core'
import { environment } from '@env/environment'
import * as mapboxgl from 'mapbox-gl'
import {
  BehaviorSubject,
  Observable,
  Subscription
} from 'rxjs'
import { DirectionService } from 'src/app/shared/services/direction.service'
import { LocationService } from 'src/app/shared/services/location.service'

type MarkerMap = Map<string, mapboxgl.Marker | undefined>

@Injectable( {
  providedIn: 'root'
} )
export class MapService implements OnDestroy {
  constructor( private location: LocationService,
  private direction : DirectionService) {
    this.mapbox.accessToken = environment.mapBoxApiKey
    this.locationSub        =
      this.location.newPosition$.subscribe( async ( [ lat, lng ] ) => {
        await this.autoFollow( { lat: lat, lng: lng } )
      } )
  }

  public ngOnDestroy(): void {
    this.locationSub.unsubscribe()
  }

  private markerClick = new BehaviorSubject<[ lng: number, lat: number ] | null>(
    null )

  public markerClick$: Observable<[ lng: number, lat: number ] | null> = this.markerClick.asObservable()

  locationSub: Subscription
  mapbox                                                = ( mapboxgl as typeof mapboxgl )
  map: Map<string, mapboxgl.Map>                        = new Map()
  style                                                 = `mapbox://styles/mapbox/streets-v11`
  userMarkers: Map<string, mapboxgl.Marker | undefined> = new Map()
  routeMarkers: Map<string, MarkerMap>                  = new Map()

  public addRouteMarker( pageKey: string, locationKey: string,
    center: { lat: number; lng: number } )
  {
    if ( !this.routeMarkers.has( pageKey ) ) {
      this.routeMarkers.set( pageKey, new Map() )
    }
    let pageMarkers = this.routeMarkers.get( pageKey )!

    if ( pageMarkers.has( locationKey ) ) {
      pageMarkers.get( locationKey )!.remove()
    }

    const mapEntry = this.map.get( pageKey )

    if ( mapEntry === undefined ) {
      return
    }

    const newLocationMarker = new mapboxgl.Marker( { color: 'red' } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( mapEntry )
    pageMarkers.set( locationKey, newLocationMarker )
  }

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
      // : { coords: { latitude: 43.1746, longitude: -2.4125 } }
      : { coords: { latitude: -40.6294, longitude: -133.6242 } }
    this.map.set( key, new mapboxgl.Map( {
      container: divElement.id,
      style    : this.style,
      zoom     : 15,
      center   : [ pos.coords.longitude, pos.coords.latitude ]
    } ) )

    const mapEntry = this.map.get( key )!

    if ( this.location.position !== undefined ) {
      this.addUserMarker( key, {
        lat: this.location.position.coords.latitude,
        lng: this.location.position.coords.longitude
      }, mapEntry )
    }
    else {
      this.userMarkers.set( key, undefined )
    }

    mapEntry.addControl( new mapboxgl.NavigationControl() )

    mapEntry.on( 'click', ( e ) => {
      const { lat, lng } = e.lngLat
      this.markerClick.next( [ lng, lat ] )
    } )
  }

  async autoFollow( center: { lat: number, lng: number } ) {
    if ( this.userMarkers.size === 0 ) {
      return
    }
    for ( const [ keyEntry, mapEntry ] of this.map ) {
      mapEntry.panTo( { lat: center.lat, lng: center.lng } )
      this.addUserMarker( keyEntry, center, mapEntry )
    }
  }

  private addUserMarker( keyEntry: string, center: { lat: number; lng: number },
    mapEntry: mapboxgl.Map ): void {
    let userMark = this.userMarkers.get( keyEntry )

    if ( userMark !== undefined ) {
      userMark.remove()
    }
    userMark = new mapboxgl.Marker( { color: 'black' } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( mapEntry )
  }

  async addRouteMap( pageKey: string, inicio: { lng: number, lat: number },
    final: { lng: number, lat: number } )
  {
    await this.direction.getDirection( inicio, final)
  }
}
