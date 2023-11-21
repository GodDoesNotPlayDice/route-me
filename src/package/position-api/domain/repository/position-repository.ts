import { Result } from 'oxide.ts'
import { PermissionState } from 'src/package/position-api/domain/models/permission-state'
import { Position } from 'src/package/position-api/domain/models/position'

export declare type WatchPositionCallback = ( position: Position | null,
	err?: any ) => void;

export abstract class PositionRepository {
	abstract startWatch( callback: WatchPositionCallback ): Promise<string>

	abstract endWatch( id: string ): Promise<void>

	abstract requestPermissions(): Promise<PermissionState>

	abstract checkPermissions(): Promise<PermissionState>

	abstract getLastPosition(): Promise<Result<Position, Error>>
}
