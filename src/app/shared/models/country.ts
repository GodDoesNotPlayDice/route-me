import * as z from 'zod'

export interface CountryProps {
	flags: Flags;
	name: Name;
	cca2: string;
	idd: Idd;
}

export interface FlagsProps {
	png: string;
	svg: string;
	alt: string;
}

export interface IddProps {
	root: RootEnum;
	suffixes: string[];
}

export enum RootEnum {
	Empty = '',
	The1  = '+1',
	The2  = '+2',
	The3  = '+3',
	The4  = '+4',
	The5  = '+5',
	The6  = '+6',
	The7  = '+7',
	The8  = '+8',
	The9  = '+9',
}

export interface NameProps {
	common: string;
	official: string;
	nativeName: { [key: string]: NativeName };
}

export interface NativeNameProps {
	official: string;
	common: string;
}


export const RootSchema = z.enum( [
	'',
	'+1',
	'+2',
	'+3',
	'+4',
	'+5',
	'+6',
	'+7',
	'+8',
	'+9'
] )
export type Root = z.infer<typeof RootSchema>;

export const NativeNameSchema = z.object( {
	'official': z.string(),
	'common'  : z.string()
} )
export type NativeName = z.infer<typeof NativeNameSchema>;

export const newNativeName = ( props: NativeNameProps ): NativeName => {
	return NativeNameSchema.parse( {
		official: props.official,
		common  : props.common
	} )
}

export const NameSchema = z.object( {
	'common'    : z.string(),
	'official'  : z.string(),
	'nativeName': z.record( z.string(), NativeNameSchema )
} )
export type Name = z.infer<typeof NameSchema>;

export const newName = ( props: NameProps ): Name => {
	return NameSchema.parse( {
		common    : props.common,
		official  : props.official,
		nativeName: props.nativeName
	} )
}

export const IddSchema = z.object( {
	'root'    : RootSchema,
	'suffixes': z.array( z.string() )
} )
export type Idd = z.infer<typeof IddSchema>;

export const newIdd = ( props: IddProps ): Idd => {
	return IddSchema.parse( {
		root    : props.root,
		suffixes: props.suffixes
	} )
}

export const FlagsSchema = z.object( {
	'png': z.string(),
	'svg': z.string(),
	'alt': z.string()
} )
export type Flags = z.infer<typeof FlagsSchema>;

export const newFlags = ( props: FlagsProps ): Flags => {
	return FlagsSchema.parse( {
		png: props.png,
		svg: props.svg,
		alt: props.alt
	} )
}

export const CountrySchema = z.object( {
	'flags': FlagsSchema,
	'name' : NameSchema,
	'cca2' : z.string(),
	'idd'  : IddSchema
} )
export type Country = z.infer<typeof CountrySchema>;

export const newCountry = ( props: CountryProps ): Country => {
	return CountrySchema.parse( {
		flags: {
			png: props.flags.png,
			svg: props.flags.svg,
			alt: props.flags.alt
		},
		name : {
			common    : props.name.common,
			official  : props.name.official,
			nativeName: props.name.nativeName
		},
		cca2 : props.cca2,
		idd  : {
			root    : props.idd.root,
			suffixes: props.idd.suffixes
		}
	} )
}
