import { z } from 'zod'

export const CountryFlagUrlSchema = z.object( {
	png: z.string()
} )

type CountryFlagUrlType = z.infer<typeof CountryFlagUrlSchema>

export interface CountryFlagUrl extends CountryFlagUrlType {}

export interface CountryFlagUrlProps{
	png: string
}

export const newCountryFlagUrl = ( props: CountryFlagUrlProps ): CountryFlagUrl => {
	return CountryFlagUrlSchema.parse( {
		png: props.png
	} )
}
