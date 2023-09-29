import { z } from 'zod'

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
type NativeNameType = z.infer<typeof NativeNameSchema>;
export interface NativeName extends NativeNameType {}

export const NameSchema = z.object( {
  'common'    : z.string(),
  'official'  : z.string(),
  'nativeName': z.record( z.string(), NativeNameSchema )
} )
type NameType = z.infer<typeof NameSchema>;
export interface Name extends NameType {}

export const IddSchema = z.object( {
  'root'    : RootSchema,
  'suffixes': z.array( z.string() )
} )
export type IddType = z.infer<typeof IddSchema>;
export interface Idd extends IddType{}

export const FlagsSchema = z.object( {
  'png': z.string(),
  'svg': z.string(),
  'alt': z.string()
} )
type FlagsType = z.infer<typeof FlagsSchema>;
export interface Flags extends FlagsType {}

export const CountrySchema = z.object( {
  'flags': FlagsSchema,
  'name' : NameSchema,
  'cca2' : z.string(),
  'idd'  : IddSchema
} )
type CountryType = z.infer<typeof CountrySchema>;
export interface Country extends CountryType {}

