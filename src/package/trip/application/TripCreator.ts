import {
  Err,
  Result
} from 'oxide.ts'
import {
  TripDAO,
} from 'src/package/trip/domain'

export class TripCreator {
  constructor( private repository: TripDAO ) {
  }

  // TODO: aparte de recibir trip data, deberia gestionar que pricing strategy se va a usar
  async execute(): Promise<Result<boolean, string>> {
    // const result = await this.repository.save()
    // return Promise.resolve( Ok( result.unwrap() ) )
    // const currency = new Currency("ARS")
    // const base = new Money(100)
    // const seat = new TripSeat(2)
    // const perSeat = new Money(50)
    // const s = new BasicPricing(base, perSeat, seat)
    // const p = new TripPrice(s, currency)
    return Promise.resolve( Err("not") )
  }
}
