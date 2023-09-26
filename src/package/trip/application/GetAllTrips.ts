import {
  Ok,
  Result
} from 'oxide.ts'
import {
  Trip,
  TripDAO
} from 'src/package/trip/domain'

export class GetAllTrips {
  constructor( private repository: TripDAO ) {
  }

  async execute(): Promise<Result<Trip[], string>> {
    const result = await this.repository.getAll()
    return Promise.resolve( Ok( result.unwrap() ) )
    // return Promise.resolve( Err("not") )
  }
}
