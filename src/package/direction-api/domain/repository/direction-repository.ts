import { Result } from 'oxide.ts'
import { Direction } from 'src/package/direction-api/domain/models/direction'
import { Position } from 'src/package/position-api/domain/models/position'

export abstract class DirectionRepository {
	abstract getDirection( inicio: Position,
		final: Position ): Promise<Result<Direction, Error[]>>
}
