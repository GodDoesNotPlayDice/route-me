import {
  Geolocation as CapacitorGeolocation,
  PermissionStatus as CapacitorPermission
} from '@capacitor/geolocation'
import {
  newPermissionState,
  PermissionState
} from 'src/package/location-api/domain/models/permission-state'
import {
  newPosition,
  Position
} from 'src/package/location-api/domain/models/position'
import {
  LocationRepository,
  WatchPositionCallback
} from 'src/package/location-api/domain/repository/location-repository'

export class Geolocation implements LocationRepository {
  async checkPermissions(): Promise<PermissionState> {
    const permission = await CapacitorGeolocation.checkPermissions()
    return this.convertPermissions(permission)
  }

  endWatch( id: string ): Promise<void> {
    return CapacitorGeolocation.clearWatch( {
      id: id
    } )
  }

  async getLastPosition(): Promise<Position> {
    const position = await CapacitorGeolocation.getCurrentPosition()
    return newPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  async requestPermissions(): Promise<PermissionState> {
    const permission = await CapacitorGeolocation.requestPermissions()
    return this.convertPermissions(permission)
  }

  async startWatch( callback: WatchPositionCallback ): Promise<string> {
    return await CapacitorGeolocation.watchPosition( {}, ( position, err ) => {
      let pos : Position | null = null
      if ( position !== null ){
        pos = newPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }
      callback(pos, err)
    } )
  }

  convertPermissions(permission : CapacitorPermission): PermissionState {
    let p = 'Denied'
    if ( permission.location === 'prompt' || permission.location === 'prompt-with-rationale' ){
      p = 'Prompt'
    }
    else if ( permission.location === 'granted' ){
      p = 'Granted'
    }
    return newPermissionState({
      value: p
    })
  }
}

