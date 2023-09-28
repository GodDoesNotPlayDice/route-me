import { z } from 'zod'

export const RadioButtonDataSchema = z.object( {
  icon: z.string(),
  name: z.string()
} )

export type RadioButtonData = z.infer<typeof RadioButtonDataSchema>

export const newRadioButtonData = ( props: RadioButtonData ): RadioButtonData => {
  return RadioButtonDataSchema.parse( {
    icon: props.icon,
    name: props.name
  } )
}
