import { Position } from 'src/package/location-api/domain/models/position'
import { LocationRepository } from 'src/package/location-api/domain/repository/location-repository'

export const getLastPositionLocation = async ( repository: LocationRepository): Promise<Position> => {
    return await repository.getLastPosition()
}
