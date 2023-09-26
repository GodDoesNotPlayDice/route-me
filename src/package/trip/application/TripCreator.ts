import {
  Err,
  Result
} from 'oxide.ts'
import { TripDAO } from 'src/package/trip/domain'

export class TripCreator {
  constructor( private repository: TripDAO ) {
  }

  async execute(): Promise<Result<boolean, string>> {
    // const result = await this.repository.save()
    // return Promise.resolve( Ok( result.unwrap() ) )
    return Promise.resolve( Err("not") )
  }
}
