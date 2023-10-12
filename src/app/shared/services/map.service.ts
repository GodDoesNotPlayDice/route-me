import {
  Injectable,
  OnDestroy
} from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  BehaviorSubject,
  Observable,
  Subscription
} from 'rxjs'
import { DirectionService } from 'src/app/shared/services/direction.service'
import { LocationService } from 'src/app/shared/services/location.service'
import { Position } from 'src/package/position-api/domain/models/position'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'

@Injectable( {
  providedIn: 'root'
} )
export class MapService implements OnDestroy {
  constructor( private location: LocationService,
    private mapRepository: MapRepository<mapboxgl.Map, mapboxgl.Marker>,
    private directionService: DirectionService )
  {
    this.location$ =
      this.location.newPosition$.subscribe( async ( value ) => {
        if ( value === null ) {
          return
        }
        this.lastPosition = value
        await this.autoFollow( { lat: value.lat, lng: value.lng } )
      } )
  }

  ngOnDestroy(): void {
    this.location$.unsubscribe()
  }

  private lastPosition: Position | null = null
  location$: Subscription

  private markerClick = new BehaviorSubject<Position | null>( null )

  public markerClick$: Observable<Position | null> = this.markerClick.asObservable()


  async removeRouteMarker(pageKey: string, locationKey: string): Promise<void> {
    return await this.mapRepository.removeRouteMarker( pageKey, locationKey )
  }

    async addRouteMarker( pageKey: string, locationKey: string,
    center: Position, color: string ): Promise<void>
  {
    return await this.mapRepository.addRouteMarker( pageKey, locationKey,
      center, color )
  }

  async init( key: string, divElement: HTMLDivElement ) {
    const mapEntry = await this.mapRepository.init( key, divElement,
      this.lastPosition )

    if ( this.lastPosition !== null ) {
      await this.autoFollow( this.lastPosition )
      await this.addUserMarker( key, this.lastPosition, mapEntry )
    }

    mapEntry.on( 'click', ( e ) => {
      const { lat, lng } = e.lngLat
      this.markerClick.next( { lat: lat, lng: lng } )
    } )
  }

  async autoFollow( center: Position ) {
    return await this.mapRepository.autoFollow( center )
  }

  private async addUserMarker( pageKey: string, center: Position,
    map: mapboxgl.Map ): Promise<void> {
    return this.mapRepository.addUserMarker( pageKey, center, map )
  }

  async removeRouteMap( pageKey: string ): Promise<void> {
    return await this.mapRepository.removeRouteMap( pageKey )
  }

  async addRouteMap( pageKey: string, inicio: Position,
    final: Position ): Promise<Result<boolean, string>>
  {
    const result = await this.directionService.getDirection( inicio, final )

    if ( result.isErr() ) {
      return Err( result.unwrapErr() )
    }
    await this.mapRepository.addRouteMap( pageKey,
      result.unwrap().coordinates )
    return Ok( true )
  }
}
