import { z } from 'zod'

export const DriverDocumentNameSchema = z.object( {
  value : z.string()
} )

type DriverDocumentNameType = z.infer<typeof DriverDocumentNameSchema>
export interface DriverDocumentName extends DriverDocumentNameType{}

interface DriverDocumentNameProps {
  value : string
}

export const newDriverDocumentName = (props : DriverDocumentNameProps): DriverDocumentName => {
  return DriverDocumentNameSchema.parse( {
    value : props.value
  } )
}
