import { z } from 'zod'

export const CountryNameSchema = z.object( {
	common  : z.string(),
	official: z.string()
} )
type CountryNameType = z.infer<typeof CountryNameSchema>

export interface CountryName extends CountryNameType {}
export interface CountryNameProps{
	common  : string
	official: string
}

export const newCountryName = ( props: CountryNameProps ): CountryName => {
	return CountryNameSchema.parse( {
		official: props.official,
		common  : props.common
	} )
}
