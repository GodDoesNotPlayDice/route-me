import { z } from 'zod'

export const DriverDocumentReferenceSchema = z.object( {
  value : z.string()
} )

export type DriverDocumentReference = z.infer<typeof DriverDocumentReferenceSchema>

interface DriverDocumentReferenceProps {
  value : string
}

export const newDriverDocumentReference = (props : DriverDocumentReferenceProps): DriverDocumentReference => {
  return DriverDocumentReferenceSchema.parse( {
    value : props.value
  } )
}
