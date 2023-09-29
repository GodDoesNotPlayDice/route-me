import {
  CategoryName,
  newCategoryName
} from 'src/package/category'
import {
	Location,
	newLocation
} from 'src/package/shared'
import {
	newValidDate,
	ValidDate
} from 'src/package/shared/domain/models/valid-date'
import {
  newTripID,
  TripID
} from 'src/package/trip'
import { z } from 'zod'

export const NumberSchema = z.number()

export const NearTripSchema = z.object( {
  latitude : NumberSchema,
  longitude: NumberSchema
} )

type NearTripType = z.infer<typeof NearTripSchema>

export interface NearTrip extends NearTripType {
  id: TripID
  startDate: ValidDate
  endDate: ValidDate
  startLocation: Location
  endLocation: Location
  categoryName: CategoryName
}

export interface NearTripProps {
  id: string
  startDate: Date
  endDate: Date
  startLocation: string
  endLocation: string
  categoryName: string
  latitude: number
  longitude: number
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
