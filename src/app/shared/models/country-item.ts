
import { z } from 'zod'

export const CountryItemSchema = z.object( {
	image: z.boolean(),
	name  : z.string(),
	cca  : z.string(),
	selected: z.boolean()
} )

type CountryItemType = z.infer<typeof CountryItemSchema>
export interface CountryItem extends CountryItemType {}

export interface CountryItemProps {
	image: string,
	name: string,
	cca: string
	selected: boolean
}

export const newCountryItem = ( props: CountryItemProps ): CountryItem => {
	return CountryItemSchema.parse( {
		image: props.image,
		name  : props.name
	} )
}
