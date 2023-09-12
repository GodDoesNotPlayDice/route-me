import * as z from "zod";


export const RootSchema = z.enum([
  "",
  "+1",
  "+2",
  "+3",
  "+4",
  "+5",
  "+6",
  "+7",
  "+8",
  "+9",
]);
export type Root = z.infer<typeof RootSchema>;

export const NativeNameSchema = z.object({
  "official": z.string(),
  "common": z.string(),
});
export type NativeName = z.infer<typeof NativeNameSchema>;

export const NameSchema = z.object({
  "common": z.string(),
  "official": z.string(),
  "nativeName": z.record(z.string(), NativeNameSchema),
});
export type Name = z.infer<typeof NameSchema>;

export const IddSchema = z.object({
  "root": RootSchema,
  "suffixes": z.array(z.string()),
});
export type Idd = z.infer<typeof IddSchema>;

export const FlagsSchema = z.object({
  "png": z.string(),
  "svg": z.string(),
  "alt": z.string(),
});
export type Flags = z.infer<typeof FlagsSchema>;

export const CountrySchema = z.object({
  "flags": FlagsSchema,
  "name": NameSchema,
  "cca2": z.string(),
  "idd": IddSchema,
});
export type Country = z.infer<typeof CountrySchema>;
