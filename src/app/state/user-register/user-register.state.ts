import { z } from 'zod'

export const UserPreference = z.object( {
  icon: z.string(),
  name: z.string()
} )
                               .brand<'UserPreference'>()

export type UserPreference = z.infer<typeof UserPreference>

export const UserRegisterState = z.object( {
  email      : z.string(),
  password   : z.string(),
  name       : z.string(),
  lastName   : z.string(),
  phone      : z.string(),
  country    : z.string(),
  genre      : z.string(),
  birthDay   : z.date(),
  description: z.string(),
  preferences: z.array( UserPreference )
} )
                                  .brand<'UserRegisterState'>()

export type UserRegisterState = z.infer<typeof UserRegisterState>
