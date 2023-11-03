import {
	Injectable,
	OnDestroy
} from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import {
	Err,
	None,
	Ok,
	Option,
	Result,
	Some
} from 'oxide.ts'
import {
	BehaviorSubject,
	Observable,
	Subscription
} from 'rxjs'
import { DirectionService } from 'src/app/shared/services/direction.service'
import { PositionService } from 'src/app/shared/services/position.service'
import { Direction } from 'src/package/direction-api/domain/models/direction'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'
import { Position } from 'src/package/position-api/domain/models/position'

@Injectable( {
	providedIn: 'root'
} )
export class MapService implements OnDestroy {
	constructor( private location: PositionService,
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


	async removeRouteMarker( pageKey: string,
		locationKey: string ): Promise<boolean> {
		const result = await this.mapRepository.removeRouteMarker( pageKey,
			locationKey )
		if ( result.isErr() ) {
			console.log( 'remove route marker. map service' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}

	async addRouteMarker( pageKey: string, locationKey: string,
		center: Position, color: string ): Promise<boolean>
	{
		const result = await this.mapRepository.addRouteMarker( pageKey,
			locationKey,
			center, color )
		if ( result.isErr() ) {
			console.log( 'add route marker. map service' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}

	async init( key: string, divElement: HTMLDivElement ): Promise<boolean> {
		const mapEntry = await this.mapRepository.init( key, divElement,
			this.lastPosition )

		if ( mapEntry.isErr() ) {
			console.log( 'init. map service' )
			console.log( mapEntry.unwrapErr() )
			return false
		}

		if ( this.lastPosition !== null ) {
			await this.autoFollow( this.lastPosition )
			await this.addUserMarker( key, this.lastPosition, mapEntry.unwrap() )
		}

		mapEntry.unwrap()
		        .on( 'click', ( e ) => {
			        const { lat, lng } = e.lngLat
			        this.markerClick.next( { lat: lat, lng: lng } )
		        } )

		return true
	}

	async autoFollow( center?: Position ): Promise<boolean> {
		if (this.lastPosition === null) return false
		const result = await this.mapRepository.autoFollow( center ?? this.lastPosition)
		if ( result.isErr() ) {
			console.log( 'auto follow. map service' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}

	private async addUserMarker( pageKey: string, center: Position,
		map: mapboxgl.Map ): Promise<boolean> {
		const result = await this.mapRepository.addUserMarker( pageKey, center,
			map )

		if ( result.isErr() ) {
			console.log( 'add user marker. map service' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}

	async removeRouteMap( pageKey: string ): Promise<boolean> {
		const result = await this.mapRepository.removeRouteMap( pageKey )

		if ( result.isErr() ) {
			console.log( 'remove route map. map service' )
			console.log( result.unwrapErr() )
			return false
		}
		return true
	}

	async addRouteMap( pageKey: string, inicio: Position,
		final: Position ): Promise<Result<Direction, Error[]>>
	{
		const directionResult = await this.directionService.getDirection( inicio,
			final )


		if ( directionResult.isErr() ) {
			console.log( 'get direction. map service' )
			return Err( directionResult.unwrapErr() )
		}
		const result = await this.mapRepository.addRouteMap( pageKey,
			directionResult.unwrap().coordinates )

		if ( result.isErr() ) {
			console.log( 'add route map. map service' )
			return Err( [ result.unwrapErr() ] )
		}
		return Ok( directionResult.unwrap() )
	}
}
