import { CreatedAt } from 'src/package/shared'
import { z } from 'zod'

export class EndTripDate {

  readonly value: Date
  constructor(
    readonly createdAt: CreatedAt
  ) {
    this.value = new Date( this.createdAt.value.getTime() + 12096e5 )

    z.date().parse( this.value )
  }
}
