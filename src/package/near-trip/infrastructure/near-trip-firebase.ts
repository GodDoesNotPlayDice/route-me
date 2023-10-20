import { AngularFireDatabase } from '@angular/fire/compat/database'
import { ref } from 'firebase/database'
import { GeoFire } from 'geofire'
import {
  Err,
  Result
} from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { Position } from 'src/package/position-api/domain/models/position'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class NearTripFirebase implements NearTripRepository {

  constructor( private firebase: AngularFireDatabase ) {
    this.geoFire = new GeoFire( ref( this.firebase.database, 'test' ) )
  }

  private geoFire: GeoFire

  async getNearTrips( center: Position,
    radius: number ): Promise<Result<NearTrip[], Error[]>> {
    // const geoQuery = this.geoFire.query({
    //   center: [ -33.030484, -71.537360 ],
    //   radius: 2
    // })
    // // @ts-ignore
    // geoQuery.on("key_entered", (key, location, distance) => {
    //   const str = `${location[0]}, ${location[1]}`
    //   if (str.length ==0) return
    //   this.locationsList.push(str)
    // })
    return Err( [ new FirebaseOperationException() ] )
  }

}
