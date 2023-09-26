import {
  Ok,
  Result
} from 'oxide.ts'
import {
  Trip,
  TripDAO
} from 'src/package/trip/domain'

export class TripUpdater {
  constructor( private repository: TripDAO ) {
  }

  async execute(trip : Trip): Promise<Result<boolean, string>> {
    const result = await this.repository.update(trip)
    return Promise.resolve( Ok( true ) )
    // return Promise.resolve( Err("not") )
  }
}
