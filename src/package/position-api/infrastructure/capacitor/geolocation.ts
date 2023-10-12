import {
  Geolocation as CapacitorGeolocation,
  PermissionStatus as CapacitorPermission
} from '@capacitor/geolocation'
import {
  newPermissionState,
  PermissionState
} from 'src/package/position-api/domain/models/permission-state'
import {
  newPosition,
  Position
} from 'src/package/position-api/domain/models/position'
import {
  LocationRepository,
  WatchPositionCallback
} from 'src/package/position-api/domain/repository/location-repository'
import { ulid } from 'ulidx'

export class Geolocation implements LocationRepository {
  async checkPermissions(): Promise<PermissionState> {
    CapacitorGeolocation.checkPermissions()
    return this.convertPermissions(PermissionState.Prompt)
  }

  endWatch( id: string ): Promise<void> {
    CapacitorGeolocation.clearWatch( {
      id: id
    } )
    return Promise.resolve()
  }

  async getLastPosition(): Promise<Position> {
    const position = await CapacitorGeolocation.getCurrentPosition()
    return newPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  async requestPermissions(): Promise<PermissionState> {
    CapacitorGeolocation.requestPermissions()
    return this.convertPermissions(PermissionState.Prompt)
  }

  async startWatch( callback: WatchPositionCallback ): Promise<string> {
    CapacitorGeolocation.watchPosition( {}, ( position, err ) => {
      console.log('location capacitor', position)
      let pos : Position | null = null
      if ( position !== null ){
        pos = newPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }
      callback(pos, err)
    } )
    return Promise.resolve(ulid())
  }

  // convertPermissions(permission : CapacitorPermission): PermissionState {
  convertPermissions(permission : PermissionState): PermissionState {
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

