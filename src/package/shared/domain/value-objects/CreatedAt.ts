import { ValueObject } from 'src/package/shared/domain/base/value-object'
import { z } from 'zod'

export class CreatedAt extends ValueObject<Date> {
  constructor(
    override readonly value: Date
  )
  {
    super( value )
    this.ensureValidDate()
  }

  ensureValidDate(): void {
    const now          = new Date()
    const oneSecondAgo = new Date( now.getTime() - 1000 )
    z.date()
     .min( oneSecondAgo )
     .parse( this.value )
  }
}
