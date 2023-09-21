import { z } from 'zod'

export const AvatarSchema = z.object( {
  url : z.string(),
  name: z.string()
} )
                             .brand<'Avatar'>()

export type Avatar = z.infer<typeof AvatarSchema>
