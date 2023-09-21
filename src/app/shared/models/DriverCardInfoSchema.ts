import { AvatarSchema } from 'src/app/shared/models/AvatarSchema'
import { TripStateEnumSchema } from 'src/package/trip'

import { z } from 'zod'

export const DriverCardInfoSchema = z.object( {
  driverAvatar    : AvatarSchema,
  cost            : z.number(),
  date            : z.date(),
  state           : TripStateEnumSchema,
  startLocation   : z.string(),
  endLocation     : z.string(),
  passengerAvatars: z.array( AvatarSchema )
} )
                                     .brand<'DriverCardInfo'>()

export type DriverCardInfo = z.infer<typeof DriverCardInfoSchema>
