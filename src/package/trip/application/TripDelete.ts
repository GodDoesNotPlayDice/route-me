import {
  Ok,
  Result
} from 'oxide.ts'
import {
  TripDAO,
  TripID
} from 'src/package/trip/domain'

export class TripDelete {
  constructor( private repository: TripDAO ) {
  }

  async execute(id : TripID): Promise<Result<boolean, string>> {
    const result = await this.repository.delete(id)
    return Promise.resolve( Ok( true ) )
    // return Promise.resolve( Err("not") )
  }
}
