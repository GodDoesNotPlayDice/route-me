import { Geolocation as CapacitorGeolocation } from '@capacitor/geolocation'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PermissionState } from 'src/package/position-api/domain/models/permission-state'
import {
	newPosition,
	Position
} from 'src/package/position-api/domain/models/position'
import {
	PositionRepository,
	WatchPositionCallback
} from 'src/package/position-api/domain/repository/position-repository'
import { ulid } from 'ulidx'

export class Geolocation implements PositionRepository {
	async checkPermissions(): Promise<PermissionState> {
		CapacitorGeolocation.checkPermissions()
		return this.convertPermissions( PermissionState.Prompt )
	}

	endWatch( id: string ): Promise<void> {
		CapacitorGeolocation.clearWatch( {
			id: id
		} )
		return Promise.resolve()
	}

	async getLastPosition(): Promise<Result<Position, Error>> {
		const position = await CapacitorGeolocation.getCurrentPosition()
		const result   = newPosition( {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		} )

		if ( result.isErr() ) {
			return Err( result.unwrapErr() )
		}

		return Ok( result.unwrap() )
	}

	async requestPermissions(): Promise<PermissionState> {
		CapacitorGeolocation.requestPermissions()
		return this.convertPermissions( PermissionState.Prompt )
	}

	async startWatch( callback: WatchPositionCallback ): Promise<string> {
		CapacitorGeolocation.watchPosition( {}, ( position, err ) => {
			let pos: Position | null = null
			if ( position !== null ) {
				pos = newPosition( {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				} ).unwrap()
			}
			callback( pos, err )
		} )
		return Promise.resolve( ulid() )
	}

	// convertPermissions(permission : CapacitorPermission): PermissionState {
	convertPermissions( permission: PermissionState ): PermissionState {
		return permission
		// let p = 'Denied'
		// if ( perm.location === 'prompt' || perm.location === 'prompt-with-rationale' ){
		//   p = 'Prompt'
		// }
		// else if ( perm.location === 'granted' ){
		//   p = 'Granted'
		// }
		// return newPermissionState({
		//   value: p
		// })
	}
}

