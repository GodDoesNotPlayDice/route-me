import { PermissionState } from 'src/package/location-api/domain/models/permission-state'
import { Position } from 'src/package/location-api/domain/models/position'

export declare type WatchPositionCallback = (position: Position | null, err?: any) => void;

export abstract class LocationRepository {
  abstract startWatch(callback : WatchPositionCallback): Promise<string>
  abstract endWatch(id: string): Promise<void>
  abstract requestPermissions() : Promise<PermissionState>
  abstract checkPermissions() : Promise<PermissionState>
  abstract getLastPosition() : Promise<Position>
}
