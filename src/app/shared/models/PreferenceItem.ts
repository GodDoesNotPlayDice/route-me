import { z } from 'zod'

export const PreferenceItem = z.object({
  icon: z.string(),
  name: z.string(),
  selected: z.boolean()
}).brand<"PreferenceItem">()

export type PreferenceItem = z.infer<typeof PreferenceItem>

// export interface PreferenceItem {
//   icon: string,
//   name: string,
//   selected: boolean
// }
