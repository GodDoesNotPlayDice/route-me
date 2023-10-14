import { z } from 'zod'

export const RadioButtonDataSchema = z.object( {
  icon: z.string(),
  name: z.string()
} )

type RadioButtonDataType = z.infer<typeof RadioButtonDataSchema>

export interface RadioButtonData extends RadioButtonDataType {}

export interface RadioButtonDataProps {
  icon: string,
  name: string
}

export const newRadioButtonData = ( props: RadioButtonDataProps ): RadioButtonData => {
  return RadioButtonDataSchema.parse( {
    icon: props.icon,
    name: props.name
  } )
}
