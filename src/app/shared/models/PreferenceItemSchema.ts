import { z } from 'zod'

export const PreferenceItemSchema = z.object( {
  icon    : z.string(),
  name    : z.string(),
  selected: z.boolean()
} )
                                     .brand<'PreferenceItem'>()

export type PreferenceItem = z.infer<typeof PreferenceItemSchema>
