import { CreatedAt } from 'src/package/shared/domain/value-objects/CreatedAt'
import { z } from 'zod'
import { ValueObject } from 'src/package/shared/domain/base/value-object'

export class UpdatedAt extends ValueObject<Date> {
  constructor(
    override readonly value: Date,
    readonly createdAt: CreatedAt
  ) {
    super( value )
    this.ensureValidDate()
  }

  private ensureValidDate(): void {
    z.date()
     .min( this.createdAt.value )
     .parse( this.value )
  }
}
