import { Injectable } from '@angular/core';
import { Result } from 'oxide.ts'
import { Position } from 'src/package/location-api/domain/models/position';
import {
  StreetsData
} from 'src/package/street-api/domain/models/street'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  constructor(private streetRepository : StreetRepository) { }

  async getStreet(searchTerm : string, center : Position) : Promise<Result<StreetsData, string>> {
    return this.streetRepository.getStreet(searchTerm, center)
  }
}
