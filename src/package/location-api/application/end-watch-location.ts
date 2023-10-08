import { LocationRepository } from 'src/package/location-api/domain/repository/location-repository'

export const endWatchLocation = async ( repository: LocationRepository, id : string): Promise<void> => {
  return await repository.endWatch(id)
}
