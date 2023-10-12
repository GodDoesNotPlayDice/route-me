import { z } from 'zod'

export enum PermissionState {
  Prompt   = 'Prompt',
  Granted = 'Granted',
  Denied   = 'Denied'
}

export const TripEnumSchema = z.nativeEnum( PermissionState )

// type PermissionStateEnumType = z.infer<typeof TripEnumSchema>
// export type PermissionState = PermissionStateEnumType

export interface PermissionStateProps {
  value : string
}

export const newPermissionState = ( props: PermissionStateProps ): PermissionState => {
  return TripEnumSchema.parse( props.value )
}
