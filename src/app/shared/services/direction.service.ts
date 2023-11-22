import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { Direction } from 'src/package/direction-api/domain/models/direction'
import { DirectionRepository } from 'src/package/direction-api/domain/repository/direction-repository'
import { Position } from 'src/package/position-api/domain/models/position'

@Injectable( {
	providedIn: 'root'
} )
export class DirectionService {

	constructor( private directionRepository: DirectionRepository ) { }

	async getDirection( inicio: Position,
		final: Position ): Promise<Result<Direction, Error[]>> {
		return await this.directionRepository.getDirection( inicio, final )
	}
}
