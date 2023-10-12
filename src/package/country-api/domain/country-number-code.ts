import { z } from 'zod'

export const CountryNumberCodeSchema = z.object( {
	root    : z.string(),
	suffixes: z.array( z.string() )
} )

type CountryNumberCodeType = z.infer<typeof CountryNumberCodeSchema>

export interface CountryNumberCode extends CountryNumberCodeType {}

export interface CountryNumberCodeProps{
	root    : string
	suffixes: string[]
}

export const newCountryNumberCode = ( props: CountryNumberCodeProps ): CountryNumberCode => {
	return CountryNumberCodeSchema.parse( {
		root    : props.root,
		suffixes: props.suffixes
	} )
}
