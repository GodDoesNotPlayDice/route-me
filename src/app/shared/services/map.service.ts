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
import { Position } from 'src/package/location-api/domain/models/position'

type MarkerMap = Map<string, mapboxgl.Marker | undefined>

@Injectable( {
  providedIn: 'root'
} )
export class MapService implements OnDestroy {
  constructor( private location: LocationService,
  private direction : DirectionService) {
    this.mapbox.accessToken = environment.mapBoxApiKey
    this.locationSub        =
      this.location.newPosition$.subscribe( async ( value ) => {
        if ( value === null ) return
        this.lastPosition = value
        await this.autoFollow( { lat: value.lat, lng: value.lng } )
      } )
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe()
  }

  private lastPosition : Position | null = null

  private markerClick = new BehaviorSubject<Position | null>( null )

  public markerClick$: Observable<Position | null> = this.markerClick.asObservable()

  locationSub: Subscription
  mapbox                                                = ( mapboxgl as typeof mapboxgl )
  map: Map<string, mapboxgl.Map>                        = new Map()
  style                                                 = `mapbox://styles/mapbox/streets-v11`
  userMarkers: Map<string, mapboxgl.Marker | undefined> = new Map()
  routeMarkers: Map<string, MarkerMap>                  = new Map()

  public addRouteMarker( pageKey: string, locationKey: string,
    center: Position )
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
    if ( this.lastPosition !== null ) {
      await this.autoFollow( {
        lat: this.lastPosition.lat,
        lng: this.lastPosition.lng,
      } )
    }
    const pos = this.lastPosition !== null
      ? {
        coords: {
          latitude : this.lastPosition.lat,
          longitude: this.lastPosition.lng,
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

    if ( this.lastPosition !== null ) {
      this.addUserMarker( key, {
        lat: this.lastPosition.lat,
        lng: this.lastPosition.lng
      }, mapEntry )
    }
    else {
      this.userMarkers.set( key, undefined )
    }

    mapEntry.addControl( new mapboxgl.NavigationControl() )

    mapEntry.on( 'click', ( e ) => {
      const { lat, lng } = e.lngLat
      //TODO: ver si es necesario hacer mapper
      this.markerClick.next( {
        lat: lat,
        lng: lng
      } )
    } )
  }

  async autoFollow( center: Position ) {
    if ( this.userMarkers.size === 0 ) {
      return
    }
    for ( const [ keyEntry, mapEntry ] of this.map ) {
      mapEntry.panTo( { lat: center.lat, lng: center.lng } )
      this.addUserMarker( keyEntry, center, mapEntry )
    }
  }

  private addUserMarker( keyEntry: string, center: Position,
    mapEntry: mapboxgl.Map ): void {
    let userMark = this.userMarkers.get( keyEntry )

    if ( userMark !== undefined ) {
      userMark.remove()
    }
    userMark = new mapboxgl.Marker( { color: 'black' } )
      .setLngLat( [ center.lng, center.lat ] )
      .addTo( mapEntry )
  }

  async addRouteMap( pageKey: string, inicio: Position,
    final: Position )
  {
    const response = await this.direction.getDirection( inicio, final)
    if ( response === undefined ) return

    const mapEntry = this.map.get( pageKey )

    if ( mapEntry === undefined ) return

    console.log('response')
    const route = Object.values(response)[0]
    const {geometry } = route[0]
    const coordinates = geometry.coordinates

    const routeKey = `${pageKey}-route`
    if ( mapEntry.isSourceLoaded( routeKey ) ) {
      mapEntry.removeSource(routeKey)
      mapEntry.removeLayer(routeKey)
    }

    mapEntry.addSource(routeKey, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type       : 'LineString',
          coordinates: coordinates
        },
      }
    })

    mapEntry.addLayer({
      id: routeKey,
      type: 'line',
      source: routeKey,
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  }
}
