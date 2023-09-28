import { z } from 'zod'

export const DriverDocumentIDSchema = z.object( {
  value : z.string()
} )

export type DriverDocumentID = z.infer<typeof DriverDocumentIDSchema>

interface DriverDocumentIDProps {
  value : string
}

export const newDriverDocumentID = (props : DriverDocumentIDProps): DriverDocumentID => {
  return DriverDocumentIDSchema.parse( {
    value : props.value
  } )
}
