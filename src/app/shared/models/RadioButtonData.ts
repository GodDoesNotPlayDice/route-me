import { z } from "zod"

export const RadioButtonData = z.object({
  icon: z.string(),
  name: z.string()
}).brand<"RadioButtonData">()

export type RadioButtonData = z.infer<typeof RadioButtonData>

// export interface RadioButtonData {
//   icon: string
//   name: string
// }
