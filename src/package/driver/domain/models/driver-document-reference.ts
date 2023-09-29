import { z } from 'zod'

export const DriverDocumentReferenceSchema = z.object( {
  value : z.string()
} )

type DriverDocumentReferenceType = z.infer<typeof DriverDocumentReferenceSchema>
export interface DriverDocumentReference extends DriverDocumentReferenceType{}

interface DriverDocumentReferenceProps {
  value : string
}

export const newDriverDocumentReference = (props : DriverDocumentReferenceProps): DriverDocumentReference => {
  return DriverDocumentReferenceSchema.parse( {
    value : props.value
  } )
}
