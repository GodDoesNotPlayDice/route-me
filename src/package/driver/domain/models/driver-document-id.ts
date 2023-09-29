import { z } from 'zod'

export const DriverDocumentIDSchema = z.object( {
  value : z.string()
} )

type DriverDocumentIDType = z.infer<typeof DriverDocumentIDSchema>
export interface DriverDocumentID extends DriverDocumentIDType{}

interface DriverDocumentIDProps {
  value : string
}

export const newDriverDocumentID = (props : DriverDocumentIDProps): DriverDocumentID => {
  return DriverDocumentIDSchema.parse( {
    value : props.value
  } )
}
