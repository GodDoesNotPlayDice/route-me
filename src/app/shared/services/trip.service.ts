import { Injectable } from '@angular/core'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'

@Injectable( {
  providedIn: 'root'
} )
export class TripService {
  constructor( private tripDao: TripDao ) { }

  async create( props: {
    startPosition: Position,
    endPosition: Position,
    startName: string,
    endName: string,
    startDate: Date
    //TODO: calcular end date por default a 2 semanas despues
    // endDate: Date
  } ): Promise<boolean> {
    //TODO: use case deberia crear el trip
    return false
  }
}
