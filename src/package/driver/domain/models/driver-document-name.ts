import { z } from 'zod'

export const DriverDocumentNameSchema = z.object( {
  value : z.string()
} )

export type DriverDocumentName = z.infer<typeof DriverDocumentNameSchema>

interface DriverDocumentNameProps {
  value : string
}

export const newDriverDocumentName = (props : DriverDocumentNameProps): DriverDocumentName => {
  return DriverDocumentNameSchema.parse( {
    value : props.value
  } )
}
