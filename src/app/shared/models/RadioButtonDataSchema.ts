import { z } from 'zod'

export const RadioButtonDataSchema = z.object( {
  icon: z.string(),
  name: z.string()
} )
                                      .brand<'RadioButtonData'>()

export type RadioButtonData = z.infer<typeof RadioButtonDataSchema>
