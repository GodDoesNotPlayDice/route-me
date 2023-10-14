import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { directionFromJson } from 'src/package/direction-api/application/direction-mapper'
import { DirectionNotFoundException } from 'src/package/direction-api/domain/exceptions/direction-not-found-exception'
import { Direction } from 'src/package/direction-api/domain/models/direction'
import { DirectionRepository } from 'src/package/direction-api/domain/repository/direction-repository'
import { Position } from 'src/package/position-api/domain/models/position'

export class DirectionMapBox implements DirectionRepository {
  constructor( private http: HttpClient ) {}

  /**
   * Get direction
   * @throws {DirectionNotFoundException} - if direction not found
   */
  async getDirection( inicio: Position,
    final: Position ): Promise<Result<Direction, Error>> {
    const start = `${ inicio.lng },${ inicio.lat }`
    const end   = `${ final.lng },${ final.lat }`

    const response = await this.http.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${ start };${ end }?alternatives=true&geometries=geojson&overview=simplified&steps=false&access_token=${ environment.mapBoxApiKey }` )
                               .toPromise()

    if ( response === undefined ) {
      return Err( new DirectionNotFoundException() )
    }

    const directionResult = directionFromJson( response )

    if ( directionResult.isErr() ) {
      return Err( directionResult.unwrapErr() )
    }
    return Ok( directionResult.unwrap() )
  }

}
