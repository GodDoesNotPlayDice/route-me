import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { Position } from 'src/package/position-api/domain/models/position'
import { StreetsData } from 'src/package/street-api/domain/models/streets-data'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'

@Injectable( {
  providedIn: 'root'
} )
export class StreetService {

  constructor( private streetRepository: StreetRepository ) { }

  async getStreetByTerm( searchTerm: string,
    center: Position ): Promise<Result<StreetsData, Error[]>> {
    return await this.streetRepository.getStreetsByTerm( searchTerm, center )
  }

  async getStreetsByPosition( center: Position ): Promise<Result<StreetsData, Error[]>> {
    return await this.streetRepository.getStreetsByPosition( center )
  }
}
