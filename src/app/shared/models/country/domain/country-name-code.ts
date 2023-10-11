import { z } from 'zod'

export const CountryNameCodeSchema = z.object( {
	value: z.string()
} )

type CountryNameCodeType = z.infer<typeof CountryNameCodeSchema>

export interface CountryNameCode extends CountryNameCodeType {}

export interface CountryNameCodeProps{
	value: string
}

export const newCountryNameCode = ( props: CountryNameCodeProps ): CountryNameCode => {
	return CountryNameCodeSchema.parse( {
		value: props.value
	} )
}
