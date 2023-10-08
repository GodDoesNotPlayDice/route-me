import {
  LocationRepository,
  WatchPositionCallback
} from 'src/package/location-api/domain/repository/location-repository'

export const startWatchLocation = async ( repository: LocationRepository, callback : WatchPositionCallback): Promise<string> => {
  return await repository.startWatch(callback)
}
