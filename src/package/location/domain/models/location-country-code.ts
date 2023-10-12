import { z } from 'zod'

export const LocationCountryCodeSchema = z.object( {
  value: z.string()
} )

type LocationCountryCodeType = z.infer<typeof LocationCountryCodeSchema>

export interface LocationCountryCode extends LocationCountryCodeType {}

export interface LocationCountryCodeProps{
  value: string
}

export const newLocationCountryCode = ( props: LocationCountryCodeProps ): LocationCountryCode => {
  return LocationCountryCodeSchema.parse( {
    value: props.value
  } )
}
