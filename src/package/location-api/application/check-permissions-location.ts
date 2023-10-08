import { PermissionState } from 'src/package/location-api/domain/models/permission-state'
import { LocationRepository } from 'src/package/location-api/domain/repository/location-repository'

export const checkPermissionsLocation = async ( repository: LocationRepository): Promise<PermissionState> => {
  return await repository.checkPermissions()
}
