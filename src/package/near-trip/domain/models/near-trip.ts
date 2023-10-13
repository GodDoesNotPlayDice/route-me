import { CategoryProps } from 'src/package/category/domain/models/category'
import {
  CategoryName,
  newCategoryName
} from 'src/package/category/domain/models/category-name'
import {
  Location,
  LocationProps
} from 'src/package/location/domain/models/location'
import {
  Position,
  PositionProps
} from 'src/package/position-api/domain/models/position'
import {
	newValidDate,
	ValidDate
} from 'src/package/shared/domain/models/valid-date'
import {
  newTripID,
  TripID
} from 'src/package/trip/domain/models/trip-id'

export interface NearTrip {
  id: TripID
  startDate: ValidDate
  endDate: ValidDate
  startLocation: Location
  endLocation: Location
  categoryName: CategoryName
  position : Position
}

export interface NearTripProps {
  id: string
  startDate: Date
  endDate: Date
  startLocation: LocationProps
  endLocation: LocationProps
  categoryName: CategoryProps
  position: PositionProps
}

export const newNearTrip = ( props: NearTripProps ): NearTrip => {
  return {
    id           : newTripID({
      value: props.id
    }),
    startDate    : newValidDate({
      value: props.startDate
    }),
    endDate      : newValidDate({
      value: props.endDate
    }),
    endLocation  : newLocation({
      value: props.endLocation
    }),
    startLocation: newLocation({
      value: props.startLocation
    }),
    categoryName : newCategoryName({
      value: props.categoryName
    }),
    latitude     : NumberSchema.parse(props.latitude),
    longitude     : NumberSchema.parse(props.longitude),
  }
}
