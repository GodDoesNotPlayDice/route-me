import { z } from 'zod'

export const FilterButtonDataSchema = z.object( {
  imagen: z.string(),
  name  : z.string()
} )
                                       .brand<'FilterButtonData'>()

export type FilterButtonData = z.infer<typeof FilterButtonDataSchema>
